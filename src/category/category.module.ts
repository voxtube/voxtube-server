import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { VideoService } from 'src/channel/services/video.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, VideoService, PrismaService],
})
export class CategoryModule {}
