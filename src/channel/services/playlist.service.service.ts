import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    const channel = await this.prismaService.channel.findFirst({});
  }
  findAllChannelPlaylist(channelId: string) {
    return this.prismaService.playlist.findFirst({ where: { channelId } });
  }
  updatePlayList(id: string, updatePlaylistDto: UpdatePlaylistDto) {}
  deletePlaylist(id: string) {}
}
