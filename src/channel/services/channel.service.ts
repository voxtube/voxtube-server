import { Channel } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { UpdateChannelDto } from '../dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    // check if channel name already exists
    const channelExists = await this.prismaService.channel.findFirst({
      where: { name: createChannelDto.name },
    });

    if (channelExists)
      throw new BadRequestException('Channel name already exists');

    // create channel if not exists
    const channel = await this.prismaService.channel.create({
      data: createChannelDto,
    });
    return channel;
  }

  // find all videos
  async findAll(): Promise<Channel[]> {
    return this.prismaService.channel.findMany({
      where: {
        suspend: {
          not: true,
        },
      },
      include: { user: true, _count: true },
    });
  }

  async findUserChannels(userId: string): Promise<Channel[]> {
    return this.prismaService.channel.findMany({
      where: {
        userId,
      },
      include: { user: true },
    });
  }

  async findChannelById(id: string): Promise<Channel> {
    const channel = await this.prismaService.channel.findFirst({
      where: { id },
      include: { user: true },
    });

    if (!channel) throw new NotFoundException('Channel not found');
    return channel;
  }

  async findChannelByName(name: string): Promise<Channel> {
    const channel = await this.prismaService.channel.findFirst({
      where: { name },
    });

    if (!channel) throw new NotFoundException('Channel not found');
    return channel;
  }

  async update(
    id: string,
    updateChannelDto: UpdateChannelDto,
  ): Promise<Channel> {
    const channelExist = await this.channelExist(id);
    if (!channelExist) throw new BadRequestException('Channel does not exist');

    // check if channel belongs to user
    const channel = await this.prismaService.channel.findFirst({
      where: {
        userId: updateChannelDto.userId,
      },
    });

    if (!channel) throw new UnauthorizedException('Unauthorized');

    return await this.prismaService.channel.update({
      where: { id },
      data: updateChannelDto,
    });
  }

  async channelExist(id: string) {
    const channelExist = await this.findChannelById(id);
    // convert the value to boolean
    return !!channelExist;
  }

  async delete(id: string) {
    const channel = await this.channelExist(id);
    if (!channel) throw new BadRequestException('Channel does not exist');

    return this.prismaService.channel.delete({ where: { id } });
  }
}
