import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@concinnity/database';

export interface CreateMessageDto {
  channelId: string;
  userId: string;
  content: string;
}

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  /**
   * Create a new message
   */
  async createMessage(dto: CreateMessageDto) {
    try {
      const message = await prisma.message.create({
        data: {
          content: dto.content,
          channelId: dto.channelId,
          userId: dto.userId,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
        },
      });

      this.logger.log(`Created message: ${message.id}`);
      return message;
    } catch (error) {
      this.logger.error('Error creating message', error);
      throw error;
    }
  }

  /**
   * Get messages for a channel
   */
  async getChannelMessages(channelId: string, limit = 50, offset = 0) {
    try {
      const messages = await prisma.message.findMany({
        where: { channelId },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      });

      return messages.reverse(); // Return in chronological order
    } catch (error) {
      this.logger.error('Error fetching messages', error);
      throw error;
    }
  }

  /**
   * Get a single message
   */
  async getMessage(messageId: string) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  /**
   * Delete a message
   */
  async deleteMessage(messageId: string, userId: string) {
    // Verify the user owns the message
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.userId !== userId) {
      throw new Error('Unauthorized to delete this message');
    }

    await prisma.message.delete({
      where: { id: messageId },
    });

    this.logger.log(`Deleted message: ${messageId}`);
    return { success: true };
  }

  /**
   * Update a message
   */
  async updateMessage(messageId: string, userId: string, content: string) {
    // Verify the user owns the message
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.userId !== userId) {
      throw new Error('Unauthorized to update this message');
    }

    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { content },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });

    this.logger.log(`Updated message: ${messageId}`);
    return updatedMessage;
  }
}

