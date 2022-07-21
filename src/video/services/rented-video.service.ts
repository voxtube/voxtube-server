import { RentedVideos } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RentedVideoDto } from '../dto/create-rented.dto';

@Injectable()
export class RentedVideoService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRentedVideo(
    rentedVideoDto: RentedVideoDto,
  ): Promise<RentedVideos> {
    // check if video has been purchased by user already

    // TODO: check if duration is in future

    const rentedVideo = await this.prismaService.rentedVideos.findFirst({
      where: {
        videoid: rentedVideoDto.videoid,
        userid: rentedVideoDto.userid,
      },
    });

    if (rentedVideo)
      throw new BadRequestException('content rented by user already');

    // create rented content
    return this.prismaService.rentedVideos.create({
      data: rentedVideoDto,
      include: { video: true },
    });
  }

  async getAllRentedVideos(): Promise<RentedVideos[]> {
    return this.prismaService.rentedVideos.findMany({
      include: { video: true },
    });
  }

  async getRentedVideosById(id: string): Promise<RentedVideos> {
    // check if purchase is available
    const rented = await this.prismaService.rentedVideos.findFirst({
      where: { id },
      include: { video: true },
    });

    if (!rented) throw new BadRequestException('invalid rented video');

    return rented;
  }

  async getRentedVideoByVideoId(videoid: string): Promise<RentedVideos> {
    const rented = await this.prismaService.rentedVideos.findFirst({
      where: { videoid },
      include: { video: true },
    });

    return rented;
  }

  async getUserRentedVideos(userid: string): Promise<RentedVideos[]> {
    const rented = await this.prismaService.rentedVideos.findMany({
      where: { userid },
      include: { video: true },
    });

    if (!rented) throw new BadRequestException('no rented video available ');

    return rented;
  }

  async deleteRentedVideo(id: string): Promise<RentedVideos> {
    const rented = await this.prismaService.rentedVideos.delete({
      where: { id },
    });

    if (!rented) throw new BadRequestException('invalid rented video');

    return rented;
  }
}
