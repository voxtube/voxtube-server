import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ChannelModule } from './channel/channel.module';
import { HistoryModule } from './history/history.module';
import { MetaModule } from './meta/meta.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ReportsModule } from './reports/reports.module';
import { TransactionlogModule } from './transactionlog/transactionlog.module';
import { UsersModule } from './users/users.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    ChannelModule,
    CategoryModule,
    VideoModule,
    MetaModule,
    ReportsModule,
    TransactionlogModule,
    PlaylistModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
