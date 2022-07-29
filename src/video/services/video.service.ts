import { Role, Video } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/services/users.service';
import { ViewDto } from '../dto/view.dto';
import { PurchasedService } from './purchased-video.services';
import { RentedVideoService } from './rented-video.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rentedVideoService: RentedVideoService,
    private readonly purchasedVideoService: PurchasedService,
    private readonly userService: UsersService,
  ) {}

  async findAllVideo(): Promise<Video[]> {
    return this.prismaService.video.findMany({
      where: { isPublish: true },
      include: { category: true, channel: true, _count: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllFreeVideos(): Promise<Video[]> {
    return this.prismaService.video.findMany({
      where: { isPublish: true, free: true },
      include: { category: true, _count: true },
    });
  }

  async findVideoById(id: string, userid: string): Promise<any> {
    const video = await this.prismaService.video.findUnique({
      where: { id },
      include: {
        _count: true,
        purchasedVideos: { where: { userid, videoid: id } },
      },
    });

    if (!video) throw new NotFoundException('video does not exist');

    const views = await this.addView({
      userid,
      videoid: video.id,
      channelid: video.channelid,
    });

    const userLiked = await this.prismaService.like.findFirst({
      where: { userid, videoid: id },
    });

    const userDisliked = await this.prismaService.dislike.findFirst({
      where: { userid, videoid: id },
    });

    video._count.view = views.views;

    return { ...video, liked: !!userLiked, disliked: !!userDisliked };
  }

  // adding views to video
  async addView(viewDto: ViewDto): Promise<{ views }> {
    // fetching views by videoid, userid and channelid
    const views = await this.prismaService.view.findFirst({
      where: {
        userid: viewDto.userid,
        channelid: viewDto.channelid,
        videoid: viewDto.videoid,
      },
    });

    // check if user has purchased or rented video or is admin or moderator
    const purchasedVideo =
      await this.purchasedVideoService.getPurchasedVideoByVideoId(
        viewDto.videoid,
      );

    const rentedVideo = await this.rentedVideoService.getRentedVideoByVideoId(
      viewDto.videoid,
    );

    let viewCount = 0;
    viewCount = await this.getViewCount(viewDto.videoid);

    const user = await this.userService.findById(viewDto.userid);

    if (!user) return { views: viewCount };

    if (!rentedVideo && !purchasedVideo && user.role == Role.User)
      return {
        views: viewCount,
      };

    if (views)
      return {
        views: viewCount,
      };

    await this.prismaService.view.create({
      data: viewDto,
    });

    viewCount = await this.getViewCount(viewDto.videoid);
    return {
      views: viewCount,
    };
  }

  async getViewCount(videoid: string): Promise<number> {
    return this.prismaService.view.count({
      where: { videoid },
    });
  }
}
