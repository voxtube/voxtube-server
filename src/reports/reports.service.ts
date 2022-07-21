import { Reports } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async flagVideo(createReportDto: CreateReportDto): Promise<Reports> {
    // check if video exists
    const videoExists = await this.prismaService.video.findFirst({
      where: { id: createReportDto.videoid },
    });
    if (!videoExists) {
      throw new BadRequestException('invalid videoid');
    }
    // check if user has already reported video
    const video = await this.prismaService.reports.findFirst({
      where: {
        videoid: createReportDto.videoid,
        userid: createReportDto.userid,
      },
    });
    if (video) {
      throw new BadRequestException('video already flagged by you');
    }

    // Commented out until we can implement video purchases

    // check if user has purchased, rented or viewd video before flgging
    // const v           ideoPurchased = await this.prismaService.purchasedVideos.findFirst({
    //   where: {
    //     videoid: createReportDto.videoid,
    //     userid: createReportDto.userid,
    //   },
    // });
    // const videoRented = await this.prismaService.rentedVideos.findFirst({
    //   where: {
    //     videoid: createReportDto.videoid,
    //     userid: createReportDto.userid,
    //   },
    // });

    // if (!videoPurchased || videoRented) {
    //   throw new BadRequestException('video not purchased or rented');
    // }

    return this.prismaService.reports.create({
      data: createReportDto,
      include: {
        video: true,
        user: true,
      },
    });
  }

  async getReports(): Promise<Reports[]> {
    return this.prismaService.reports.findMany({
      include: { user: true, video: true },
    });
  }

  async getReportById(id: string): Promise<Reports> {
    // check if id exists
    const report = this.prismaService.reports.findFirst({
      where: { id },
      include: {
        video: true,
        user: true,
      },
    });
    if (!report) {
      throw new BadRequestException('invalid flagged id');
    }
    return report;
  }

  async deleteReport(id: string): Promise<Reports> {
    // check if id is valid
    const report = await this.prismaService.reports.findFirst({
      where: { id },
    });
    if (!report) {
      throw new BadRequestException('invalid flagged video');
    }

    return this.prismaService.reports.delete({ where: { id } });
  }
}
