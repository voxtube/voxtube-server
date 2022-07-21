import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChannelModule } from './channel/channel.module';
import { CategoryModule } from './category/category.module';
import { VideoModule } from './video/video.module';
import { MetaModule } from './meta/meta.module';
import { ReportsModule } from './reports/reports.module';
import { TransactionlogModule } from './transactionlog/transactionlog.module';
import { PlaylistModule } from './playlist/playlist.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
