import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DyteService } from './dyte.service';
import { prisma } from '@concinnity/database';

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

  constructor(private dyteService: DyteService) {}

  /**
   * Create a new video meeting
   */
  async createMeeting(dto: CreateMeetingDto) {
    try {
      // Create meeting in Dyte
      const dyteMeeting = await this.dyteService.createMeeting(
        dto.title,
        dto.recordOnStart || false,
      );

      // Calculate end time (default 60 minutes from start)
      const startTime = dto.startTime || new Date();
      const endTime = dto.endTime || new Date(startTime.getTime() + 60 * 60 * 1000);

      // Save meeting to database
      const meeting = await prisma.meeting.create({
        data: {
          title: dto.title,
          description: dto.description,
          organizationId: dto.organizationId,
          createdById: dto.createdById,
          startTime,
          endTime,
          dyteRoomId: dyteMeeting.id,
          dyteRoomName: dyteMeeting.roomName,
          status: 'SCHEDULED',
        },
      });

      this.logger.log(`Created meeting: ${meeting.id}`);

      return {
        ...meeting,
        dyteMeetingId: dyteMeeting.id,
      };
    } catch (error) {
      this.logger.error('Failed to create meeting', error);
      throw error;
    }
  }

  /**
   * Join a video meeting
   */
  async joinMeeting(dto: JoinMeetingDto) {
    try {
      // Get meeting from database
      const meeting = await prisma.meeting.findUnique({
        where: { id: dto.meetingId },
      });

      if (!meeting) {
        throw new NotFoundException('Meeting not found');
      }

      if (!meeting.dyteRoomId) {
        throw new Error('Meeting does not have a Dyte room');
      }

      // Add participant to Dyte meeting
      const authToken = await this.dyteService.addParticipant(
        meeting.dyteRoomId,
        dto.userName,
        'group_call_host', // You can customize presets based on user role
        dto.userId,
        dto.userPicture,
      );

      // Create or update participant record
      await prisma.meetingParticipant.upsert({
        where: {
          meetingId_userId: {
            meetingId: dto.meetingId,
            userId: dto.userId,
          },
        },
        create: {
          meetingId: dto.meetingId,
          userId: dto.userId,
          status: 'ACCEPTED',
        },
        update: {
          status: 'ACCEPTED',
        },
      });

      this.logger.log(`User ${dto.userId} joined meeting ${dto.meetingId}`);

      return {
        meetingId: meeting.id,
        dyteRoomId: meeting.dyteRoomId,
        authToken: authToken.token,
        meeting: {
          title: meeting.title,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
        },
      };
    } catch (error) {
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

    if (meeting.dyteRoomId) {
      await this.dyteService.endMeeting(meeting.dyteRoomId);
    }

    await prisma.meeting.update({
      where: { id: meetingId },
      data: { status: 'COMPLETED' },
    });

    this.logger.log(`Ended meeting: ${meetingId}`);
  }
}

