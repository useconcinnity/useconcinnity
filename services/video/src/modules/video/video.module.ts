import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { DyteService } from './dyte.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService, DyteService],
  exports: [VideoService],
})
export class VideoModule {}

