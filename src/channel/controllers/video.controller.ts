import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from '../services/video.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateVideoDto } from '../dto/update-video.dto';

@ApiTags('Channel Video')
@Controller('/channel/:channelid/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('channelid') channelid: string,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    createVideoDto.channelid = channelid;
    return this.videoService.createVideo(createVideoDto);
  }

  @Get()
  findAllChannelVideo(@Param('channelid') channelid: string) {
    return this.videoService.findAllChannelVideo(channelid);
  }

  @Get(':id')
  findChannelVideoById(
    @Param('channelid') channelid: string,
    @Param('id') id: string,
  ) {
    return this.videoService.findChannelVideoById(id, channelid);
  }

  @Get('count/videos')
  getVideosCount(@Param('channelid') channelid: string) {
    return this.videoService.videosCount(channelid);
  }

  @Get('count/views')
  getVideosViewsCount(@Param('channelid') channelid: string) {
    return this.videoService.videosViewsCount(channelid);
  }

  @Patch(':videoid')
  update(
    @Param('videoid') videoid: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return this.videoService.updateVideo(videoid, updateVideoDto);
  }

  @Delete(':videoid')
  remove(@Param('videoid') videoid: string) {
    return this.videoService.deleteVideo(videoid);
  }
}
