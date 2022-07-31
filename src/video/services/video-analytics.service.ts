import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideoAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}
  mostWatch() {
    return this.prismaService.video.findMany({
      orderBy: {
        view: {
          _count: 'desc',
        },
      },
      where: { isPublish: true },
      take: 20,
    });
  }
  trendingVideos() {
    return this.prismaService.video.findMany({
      orderBy: {
        view: {
          _count: 'desc',
        },
      },
      where: { isPublish: true },
      include: { category: true, channel: true, _count: true },
      take: 20,
    });
  }
  recentlyAddedVideos() {
    return this.prismaService.video.findMany({
      orderBy: { createdAt: 'desc' },
      where: { isPublish: true },
      take: 20,
      include: { category: true, channel: true, _count: true },
    });
  }
  playlist() {
    return [];
  }

  freeVideos() {
    return this.prismaService.video.findMany({
      where: { isPublish: true, free: true },
      include: { category: true, channel: true, _count: true },
      take: 20,
    });
  }
}
