import {
  Controller,
  Post,
  Headers,
  Body,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { ClerkWebhookService } from './clerk-webhook.service';

@ApiTags('Webhooks')
@Controller('webhooks/clerk')
export class ClerkWebhookController {
  private readonly logger = new Logger(ClerkWebhookController.name);

  constructor(private readonly webhookService: ClerkWebhookService) {}

  @Post()
  @ApiOperation({ summary: 'Clerk webhook endpoint' })
  @ApiExcludeEndpoint() // Hide from Swagger docs for security
  async handleWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Body() payload: any,
  ) {
    // Verify webhook signature
    const isValid = await this.webhookService.verifyWebhook(
      payload,
      svixId,
      svixTimestamp,
      svixSignature,
    );

    if (!isValid) {
      this.logger.error('Invalid webhook signature');
      throw new BadRequestException('Invalid webhook signature');
    }

    // Handle the webhook event
    try {
      await this.webhookService.handleWebhookEvent(payload);
      return { success: true };
    } catch (error) {
      this.logger.error('Error handling webhook', error);
      throw error;
    }
  }
}

