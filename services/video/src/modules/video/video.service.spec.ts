import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { VideoService } from './video.service';

jest.mock('@concinnity/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    meeting: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    meetingParticipant: {
      upsert: jest.fn(),
    },
  },
}));

const { prisma } = jest.requireMock('@concinnity/database');

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new VideoService();
  });

  describe('createMeeting', () => {
    it('throws NotFoundException when creator not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.createMeeting({
          title: 'Test',
          organizationId: 'org-1',
          createdById: 'clerk-user',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws ForbiddenException when org mismatch', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-1',
        organizationId: 'org-1',
        role: 'MEMBER',
      });

      await expect(
        service.createMeeting({
          title: 'Test',
          organizationId: 'org-2',
          createdById: 'clerk-user',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('creates meeting when creator and org are valid', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-1',
        organizationId: 'org-1',
        role: 'MEMBER',
      });

      const meeting = { id: 'meeting-1', organizationId: 'org-1' };
      (prisma.meeting.create as jest.Mock).mockResolvedValue(meeting);

      const result = await service.createMeeting({
        title: 'Test',
        organizationId: 'org-1',
        createdById: 'clerk-user',
      });

      expect(result).toBe(meeting);
      expect(prisma.meeting.create).toHaveBeenCalled();
    });
  });

  describe('joinMeeting', () => {
    it('throws NotFoundException when meeting not found', async () => {
      (prisma.meeting.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.joinMeeting({
          meetingId: 'meeting-1',
          userId: 'clerk-user',
          userName: 'Test',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws NotFoundException when user not found', async () => {
      (prisma.meeting.findUnique as jest.Mock).mockResolvedValue({ id: 'meeting-1' });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.joinMeeting({
          meetingId: 'meeting-1',
          userId: 'clerk-user',
          userName: 'Test',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws ForbiddenException when meeting org differs from user org', async () => {
      (prisma.meeting.findUnique as jest.Mock).mockResolvedValue({
        id: 'meeting-1',
        organizationId: 'org-2',
        title: 'Test',
        startTime: new Date(),
        endTime: new Date(),
      });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-1',
        organizationId: 'org-1',
      });

      await expect(
        service.joinMeeting({
          meetingId: 'meeting-1',
          userId: 'clerk-user',
          userName: 'Test',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('joins meeting when user and meeting share org', async () => {
      const meeting = {
        id: 'meeting-1',
        organizationId: 'org-1',
        title: 'Test',
        startTime: new Date(),
        endTime: new Date(),
      };

      (prisma.meeting.findUnique as jest.Mock).mockResolvedValue(meeting);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-1',
        organizationId: 'org-1',
      });

      (prisma.meetingParticipant.upsert as jest.Mock).mockResolvedValue({});

      const result = await service.joinMeeting({
        meetingId: 'meeting-1',
        userId: 'clerk-user',
        userName: 'Test',
      });

      expect(result.meetingId).toBe('meeting-1');
      expect(prisma.meetingParticipant.upsert).toHaveBeenCalled();
    });
  });
});

