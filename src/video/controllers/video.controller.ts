import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { VideoService } from '../services/video.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  findAllVideo() {
    return this.videoService.findAllVideo();
  }

  @Get('/free')
  findAllFreeVideos() {
    return this.videoService.findAllFreeVideos();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findVideoById(@Param('id') id: string, @Request() req) {
    return this.videoService.findVideoById(id, req.user.id);
  }
}
