import { Module } from '@nestjs/common';
import { ChannelService } from './services/channel.service';
import { ChannelController } from './controllers/channel.controller';
import { PrismaService } from 'src/prisma.service';
import { VideoController } from './controllers/video.controller';
import { VideoService } from './services/video.service';
import { SubscribeService } from './services/subscribe.service';
import { SubscribeController } from './controllers/subscribe.controller';
import { MiscService } from './services/misc.service';
import { MiscController } from './controllers/misc.controller';
import { PlayListController } from './controllers/playlist.controller';
import { PlaylistService } from './services/playlist.service.service';

@Module({
  controllers: [
    ChannelController,
    SubscribeController,
    VideoController,
    MiscController,
    PlayListController,
  ],
  providers: [
    ChannelService,
    VideoService,
    SubscribeService,
    PrismaService,
    MiscService,
    PlaylistService,
  ],
})
export class ChannelModule {}
