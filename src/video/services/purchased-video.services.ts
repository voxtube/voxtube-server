import { PurchasedVideos } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PurchasedVideosDto } from '../dto/create-purchase.dto';

@Injectable()
export class PurchasedService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPurchase(
    purchasedVideoDto: PurchasedVideosDto,
  ): Promise<PurchasedVideosDto> {
    // check if video exists
    const videoExist = !!(await this.prismaService.video.findFirst({
      where: { id: purchasedVideoDto.videoid },
    }));

    if (!videoExist) throw new BadRequestException('video does not exist');

    // check if video has been purchased by user already
    const video = await this.prismaService.purchasedVideos.findFirst({
      where: {
        videoid: purchasedVideoDto.videoid,
        userid: purchasedVideoDto.userid,
      },
    });

    if (video) throw new BadRequestException('video purchased by user already');

    // create purchase
    return this.prismaService.purchasedVideos.create({
      data: purchasedVideoDto,
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        video: true,
      },
    });
  }

  async getAllPurchasedVideos(): Promise<PurchasedVideos[]> {
    return this.prismaService.purchasedVideos.findMany({
      include: {
        user: true,
        video: true,
      },
    });
  }

  async getPurchasedVideosById(id: string): Promise<PurchasedVideos> {
    // check if purchase is available
    const purchase = await this.prismaService.purchasedVideos.findFirst({
      where: { id },
      include: {
        user: true,
        video: true,
      },
    });

    if (!purchase) throw new BadRequestException('invalid purchase');

    return purchase;
  }

  async getPurchasedVideoByVideoId(videoid: string): Promise<PurchasedVideos> {
    const purchased = await this.prismaService.purchasedVideos.findFirst({
      where: { videoid },
      include: { user: true, video: true },
    });

    return purchased;
  }

  async getUserPurchasedVideos(userid: string): Promise<PurchasedVideos[]> {
    const purchased = await this.prismaService.purchasedVideos.findMany({
      where: { userid },
      include: {
        video: true,
      },
    });

    if (!purchased) throw new BadRequestException('no purchases available ');

    return purchased;
  }

  async deletePurchasedVideo(id: string): Promise<PurchasedVideos> {
    const purchased = await this.prismaService.purchasedVideos.delete({
      where: { id },
    });

    if (!purchased) throw new BadRequestException('invalid purchase');

    return purchased;
  }
}
