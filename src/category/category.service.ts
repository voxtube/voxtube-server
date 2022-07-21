import { Category, Video } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.prismaService.category.findFirst({
      where: { name: createCategoryDto.name },
    });

    if (category) throw new BadRequestException('Category already exists');

    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  async findAllCategory(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  async findCategoryById(id: string): Promise<Category> {
    return this.prismaService.category.findFirst({ where: { id } });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    const video = await this.prismaService.category.findFirst({
      where: { Video: { some: { categoryid: id } } },
    });

    if (video)
      throw new BadRequestException(
        'This category is associated with one or more videos and cannot be deleted',
      );

    return this.prismaService.category.delete({ where: { id } });
  }

  async findAllCategoryVideos(name: string): Promise<Video[]> {
    const videos = await this.prismaService.video.findMany({
      where: { category: { name } },
    });
    return videos;
  }
}
