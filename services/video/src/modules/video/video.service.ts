import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { prisma } from '@concinnity/database';
import { assertSameOrganization, hasMinimumRole } from '@concinnity/utils';

export interface CreateMeetingDto {
  title: string;
  description?: string;
  organizationId: string;
  createdById: string;
  startTime?: Date;
  endTime?: Date;
  recordOnStart?: boolean;
}

export interface JoinMeetingDto {
  meetingId: string;
  userId: string;
  userName: string;
  userPicture?: string;
}

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);

  /**
   * Create a new video meeting (provider-agnostic; Dyte removed)
   */
  async createMeeting(dto: CreateMeetingDto) {
    try {
      const creator = await prisma.user.findUnique({
        where: { clerkId: dto.createdById },
      });

      if (!creator) {
        this.logger.warn(
          `Creator not found for Clerk ID ${dto.createdById} when creating meeting`,
        );
        throw new NotFoundException('Creator not found');
      }

      // Basic role-based guard: guests cannot create meetings
      if (!hasMinimumRole(creator.role, 'MEMBER')) {
        this.logger.warn(
          `User ${creator.id} with role ${creator.role} is not allowed to create meetings`,
        );
        throw new ForbiddenException('You do not have permission to create meetings');
      }

      assertSameOrganization(creator.organizationId, dto.organizationId, {
        userId: creator.id,
        resourceId: dto.organizationId,
        resourceType: 'Organization',
      });

      // Calculate end time (default 60 minutes from start)
      const startTime = dto.startTime || new Date();
      const endTime = dto.endTime || new Date(startTime.getTime() + 60 * 60 * 1000);

      // Save meeting to database
      const meeting = await prisma.meeting.create({
        data: {
          title: dto.title,
          description: dto.description,
          organizationId: dto.organizationId,
          createdById: creator.id,
          startTime,
          endTime,
          status: 'SCHEDULED',
        },
      });

      this.logger.log(
        `Created meeting ${meeting.id} in org ${meeting.organizationId} by user ${creator.id} (role ${creator.role})`,
      );

      return meeting;
    } catch (error) {
      if ((error as any).code === 'CROSS_ORG_ACCESS_FORBIDDEN') {
        throw new ForbiddenException('You do not have access to this organization');
      }

      this.logger.error('Failed to create meeting', error);
      throw error;
    }
  }

  /**
   * Join a video meeting
   */
  async joinMeeting(dto: JoinMeetingDto) {
    try {
      const [meeting, user] = await Promise.all([
        prisma.meeting.findUnique({
          where: { id: dto.meetingId },
        }),
        prisma.user.findUnique({
          where: { clerkId: dto.userId },
        }),
      ]);

      if (!meeting) {
        throw new NotFoundException('Meeting not found');
      }

      if (!user) {
        this.logger.warn(
          `User not found for Clerk ID ${dto.userId} when joining meeting ${dto.meetingId}`,
        );
        throw new NotFoundException('User not found');
      }

      assertSameOrganization(user.organizationId, meeting.organizationId, {
        userId: user.id,
        resourceId: meeting.id,
        resourceType: 'Meeting',
      });

      // Create or update participant record
      await prisma.meetingParticipant.upsert({
        where: {
          meetingId_userId: {
            meetingId: dto.meetingId,
            userId: user.id,
          },
        },
        create: {
          meetingId: dto.meetingId,
          userId: user.id,
          status: 'ACCEPTED',
        },
        update: {
          status: 'ACCEPTED',
        },
      });

      this.logger.log(
        `User ${user.id} (org ${user.organizationId}, role ${user.role}) joined meeting ${dto.meetingId}`,
      );

      // No external video provider is configured now (Dyte removed, Agora not yet integrated)
      return {
        meetingId: meeting.id,
        authToken: null,
        meeting: {
          title: meeting.title,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
        },
        videoProvider: null,
      };
    } catch (error) {
      if ((error as any).code === 'CROSS_ORG_ACCESS_FORBIDDEN') {
        throw new ForbiddenException('You do not have access to this meeting');
      }

      this.logger.error('Failed to join meeting', error);
      throw error;
    }
  }

  /**
   * Get meeting details
   */
  async getMeeting(meetingId: string) {
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    return meeting;
  }

  /**
   * End a meeting
   */
  async endMeeting(meetingId: string) {
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
    });

    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    // No external video provider is configured now (Dyte removed, Agora not yet integrated)
    await prisma.meeting.update({
      where: { id: meetingId },
      data: { status: 'COMPLETED' },
    });

    this.logger.log(`Ended meeting: ${meetingId}`);
  }
}

