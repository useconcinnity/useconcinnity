import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VideoService, CreateMeetingDto, JoinMeetingDto } from './video.service';

@ApiTags('Video')
@ApiBearerAuth()
@Controller('meetings')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new video meeting' })
  async createMeeting(@Body() dto: CreateMeetingDto) {
    return this.videoService.createMeeting(dto);
  }

  @Post('join')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Join a video meeting' })
  async joinMeeting(@Body() dto: JoinMeetingDto) {
    return this.videoService.joinMeeting(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get meeting details' })
  async getMeeting(@Param('id') id: string) {
    return this.videoService.getMeeting(id);
  }

  @Post(':id/end')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'End a meeting' })
  async endMeeting(@Param('id') id: string) {
    return this.videoService.endMeeting(id);
  }
}

