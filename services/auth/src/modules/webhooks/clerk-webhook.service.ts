import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix';
import { prisma } from '@concinnity/database';

interface ClerkWebhookEvent {
  type: string;
  data: any;
}

@Injectable()
export class ClerkWebhookService {
  private readonly logger = new Logger(ClerkWebhookService.name);
  private readonly webhookSecret: string;

  constructor(private configService: ConfigService) {
    this.webhookSecret = this.configService.get<string>('CLERK_WEBHOOK_SECRET');
    if (!this.webhookSecret) {
      this.logger.warn('CLERK_WEBHOOK_SECRET not configured');
    }
  }

  /**
   * Verify webhook signature using Svix
   */
  async verifyWebhook(
    payload: any,
    svixId: string,
    svixTimestamp: string,
    svixSignature: string,
  ): Promise<boolean> {
    if (!this.webhookSecret) {
      this.logger.warn('Webhook secret not configured, skipping verification');
      return true; // Allow in development
    }

    try {
      const wh = new Webhook(this.webhookSecret);
      wh.verify(JSON.stringify(payload), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
      return true;
    } catch (error) {
      this.logger.error('Webhook verification failed', error);
      return false;
    }
  }

  /**
   * Handle webhook events from Clerk
   */
  async handleWebhookEvent(event: ClerkWebhookEvent): Promise<void> {
    this.logger.log(`Received webhook event: ${event.type}`);

    switch (event.type) {
      // Organization events
      case 'organization.created':
        await this.handleOrganizationCreated(event.data);
        break;
      case 'organization.updated':
        await this.handleOrganizationUpdated(event.data);
        break;
      case 'organization.deleted':
        await this.handleOrganizationDeleted(event.data);
        break;

      // User events
      case 'user.created':
        await this.handleUserCreated(event.data);
        break;
      case 'user.updated':
        await this.handleUserUpdated(event.data);
        break;
      case 'user.deleted':
        await this.handleUserDeleted(event.data);
        break;

      // Organization membership events
      case 'organizationMembership.created':
        await this.handleMembershipCreated(event.data);
        break;
      case 'organizationMembership.updated':
        await this.handleMembershipUpdated(event.data);
        break;
      case 'organizationMembership.deleted':
        await this.handleMembershipDeleted(event.data);
        break;

      default:
        this.logger.log(`Unhandled webhook event type: ${event.type}`);
    }
  }

  /**
   * Handle organization.created event
   */
  private async handleOrganizationCreated(data: any): Promise<void> {
    try {
      const org = await prisma.organization.create({
        data: {
          clerkId: data.id,
          name: data.name,
          slug: data.slug,
          logoUrl: data.image_url,
          plan: 'FREE', // Default plan
        },
      });
      this.logger.log(`Created organization: ${org.id}`);
    } catch (error) {
      this.logger.error('Error creating organization', error);
      throw error;
    }
  }

  /**
   * Handle organization.updated event
   */
  private async handleOrganizationUpdated(data: any): Promise<void> {
    try {
      const org = await prisma.organization.update({
        where: { clerkId: data.id },
        data: {
          name: data.name,
          slug: data.slug,
          logoUrl: data.image_url,
        },
      });
      this.logger.log(`Updated organization: ${org.id}`);
    } catch (error) {
      this.logger.error('Error updating organization', error);
      throw error;
    }
  }

  /**
   * Handle organization.deleted event
   */
  private async handleOrganizationDeleted(data: any): Promise<void> {
    try {
      await prisma.organization.delete({
        where: { clerkId: data.id },
      });
      this.logger.log(`Deleted organization: ${data.id}`);
    } catch (error) {
      this.logger.error('Error deleting organization', error);
      throw error;
    }
  }

  /**
   * Handle user.created event
   */
  private async handleUserCreated(data: any): Promise<void> {
    // Users are created via organizationMembership.created
    // This event is just for logging
    this.logger.log(`User created in Clerk: ${data.id}`);
  }

  /**
   * Handle user.updated event
   */
  private async handleUserUpdated(data: any): Promise<void> {
    try {
      // Update user if they exist
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: data.id },
      });

      if (existingUser) {
        await prisma.user.update({
          where: { clerkId: data.id },
          data: {
            email: data.email_addresses[0]?.email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            avatarUrl: data.image_url,
          },
        });
        this.logger.log(`Updated user: ${existingUser.id}`);
      }
    } catch (error) {
      this.logger.error('Error updating user', error);
    }
  }

  /**
   * Handle user.deleted event
   */
  private async handleUserDeleted(data: any): Promise<void> {
    try {
      await prisma.user.deleteMany({
        where: { clerkId: data.id },
      });
      this.logger.log(`Deleted user: ${data.id}`);
    } catch (error) {
      this.logger.error('Error deleting user', error);
    }
  }

  /**
   * Handle organizationMembership.created event
   */
  private async handleMembershipCreated(data: any): Promise<void> {
    try {
      // Get organization
      const org = await prisma.organization.findUnique({
        where: { clerkId: data.organization.id },
      });

      if (!org) {
        this.logger.error(`Organization not found: ${data.organization.id}`);
        return;
      }

      // Determine role
      const role = this.mapClerkRoleToRole(data.role);

      // Create or update user
      const user = await prisma.user.upsert({
        where: { clerkId: data.public_user_data.user_id },
        create: {
          clerkId: data.public_user_data.user_id,
          email: data.public_user_data.identifier,
          firstName: data.public_user_data.first_name,
          lastName: data.public_user_data.last_name,
          avatarUrl: data.public_user_data.image_url,
          role: role,
          organizationId: org.id,
        },
        update: {
          email: data.public_user_data.identifier,
          firstName: data.public_user_data.first_name,
          lastName: data.public_user_data.last_name,
          avatarUrl: data.public_user_data.image_url,
          role: role,
          organizationId: org.id,
        },
      });

      this.logger.log(`Created/updated user membership: ${user.id}`);
    } catch (error) {
      this.logger.error('Error creating membership', error);
      throw error;
    }
  }

  /**
   * Handle organizationMembership.updated event
   */
  private async handleMembershipUpdated(data: any): Promise<void> {
    try {
      const role = this.mapClerkRoleToRole(data.role);

      await prisma.user.update({
        where: { clerkId: data.public_user_data.user_id },
        data: { role },
      });

      this.logger.log(`Updated user role: ${data.public_user_data.user_id}`);
    } catch (error) {
      this.logger.error('Error updating membership', error);
    }
  }

  /**
   * Handle organizationMembership.deleted event
   */
  private async handleMembershipDeleted(data: any): Promise<void> {
    try {
      // Remove user from organization (or delete if they have no other orgs)
      await prisma.user.deleteMany({
        where: {
          clerkId: data.public_user_data.user_id,
          organization: { clerkId: data.organization.id },
        },
      });

      this.logger.log(`Deleted user membership: ${data.public_user_data.user_id}`);
    } catch (error) {
      this.logger.error('Error deleting membership', error);
    }
  }

  /**
   * Map Clerk role to our Role enum
   */
  private mapClerkRoleToRole(clerkRole: string): string {
    switch (clerkRole) {
      case 'org:admin':
        return 'ADMIN';
      case 'org:member':
        return 'MEMBER';
      default:
        return 'MEMBER';
    }
  }
}

