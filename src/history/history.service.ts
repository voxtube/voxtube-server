import { Injectable } from '@nestjs/common';
import { View } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createHistoryDto: CreateHistoryDto): Promise<View> {
    return this.prismaService.view.create({
      data: createHistoryDto,
      include: {
        video: {
          include: {
            category: true,
            _count: true,
          },
        },
        user: true,
      },
    });
  }

  findAll(): Promise<View[]> {
    return this.prismaService.view.findMany({
      include: { video: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByUserId(userid: string): Promise<View[]> {
    return this.prismaService.view.findMany({
      where: {
        userid,
      },
      include: {
        video: {
          include: {
            _count: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOneById(id: string): Promise<View> {
    return this.prismaService.view.findFirst({
      where: { id },
      include: {
        video: {
          include: {
            _count: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  update(id: string, updateHistoryDto: UpdateHistoryDto): Promise<View> {
    return this.prismaService.view.update({
      where: { id },
      data: updateHistoryDto,
      include: {
        video: {
          include: {
            _count: true,
          },
        },
        user: true,
      },
    });
  }

  remove(id: string): Promise<View> {
    return this.prismaService.view.delete({
      where: { id },
      include: {
        video: {
          include: {
            _count: true,
          },
        },
        user: true,
      },
    });
  }
}
