import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VideoAnalyticsService } from '../services/video-analytics.service';

@Controller('/video/analytics')
@ApiTags('Video analitycs')
export class VideoAnalyticsController {
  constructor(private readonly analyticsService: VideoAnalyticsService) {}
  @Get('/trending')
  trendingVideos() {
    return this.analyticsService.trendingVideos();
  }

  @Get('/most_watch')
  mostWatched() {
    return this.analyticsService.playlist();
  }

  @Get('/recent')
  recentlyAdded() {
    return this.analyticsService.recentlyAddedVideos();
  }

  @Get('/playlist')
  playlist() {
    return this.analyticsService.playlist();
  }
}
