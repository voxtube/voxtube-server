import { Module } from '@nestjs/common';
import { VideoService } from './services/video.service';
import { VideoController } from './controllers/video.controller';
import { PrismaService } from 'src/prisma.service';
import { PurchasedController } from './controllers/purchased-video.controller';
import { PurchasedService } from './services/purchased-video.services';
import { RentedVideoService } from './services/rented-video.service';
import { RentedVideoController } from './controllers/rented-video.controller';
import { UsersService } from 'src/users/services/users.service';
import { VideoAnalyticsService } from './services/video-analytics.service';
import { VideoAnalyticsController } from './controllers/video-analytics.controller';
import { VideoActionService } from './services/video-actions.service';
import { VideoActionController } from './controllers/video-action.controller';

@Module({
  controllers: [
    VideoController,
    PurchasedController,
    RentedVideoController,
    VideoAnalyticsController,
    VideoActionController,
  ],
  providers: [
    VideoService,
    PurchasedService,
    RentedVideoService,
    UsersService,
    PrismaService,
    VideoAnalyticsService,
    VideoActionService,
  ],
})
export class VideoModule {}
