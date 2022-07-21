import { Video } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService: PrismaService) {}

  async createVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    // checking if channel actually exists
    const channel = await this.prismaService.channel.findFirst({
      where: { id: createVideoDto.channelid },
    });
    if (!channel) throw new BadRequestException('Channel not found');

    //checking if category exists
    const category = await this.prismaService.category.findFirst({
      where: { id: createVideoDto.categoryid },
    });
    if (!category) throw new BadRequestException('Category not found');

    return this.prismaService.video.create({ data: createVideoDto });
  }

  async findAllChannelVideo(channelid): Promise<Video[]> {
    return this.prismaService.video.findMany({
      where: { channelid },
      include: { category: true, channel: true, _count: true },
    });
  }

  async findChannelVideoById(id: string, channelid: string) {
    const video = await this.prismaService.video.findFirst({
      where: { id, channelid },
    });
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  async updateVideo(
    id: string,
    updateVideoDto: UpdateVideoDto,
  ): Promise<Video> {
    // check if video id exist
    const video = await this.prismaService.video.findUnique({
      where: { id },
    });

    if (!video) throw new NotFoundException(`video does not exist`);

    return this.prismaService.video.update({
      where: { id },
      data: updateVideoDto,
    });
  }

  async deleteVideo(id: string): Promise<Video> {
    // check if video id exist
    const video = await this.prismaService.video.findUnique({
      where: { id },
    });

    if (!video) throw new NotFoundException(`video does not exist`);

    return this.prismaService.video.delete({ where: { id } });
  }

  async videosCount(channelid: string): Promise<{ count }> {
    const count = await this.prismaService.video.count({
      where: { channelid },
    });
    return { count };
  }

  async videosViewsCount(channelid: string): Promise<{ count }> {
    const count = await this.prismaService.view.count({
      where: { channelid },
    });
    return { count };
  }
}
