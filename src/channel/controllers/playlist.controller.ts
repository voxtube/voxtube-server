import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { PlaylistService } from '../services/playlist.service.service';

@ApiTags('playlist')
@Controller('/channel/:channelid/playlist')
export class PlayListController {
  constructor(private readonly playListService: PlaylistService) {}
  @Get()
  getChannelPlaylist(@Param('videoid') videoid: string) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNewPlaylist(@Body() playlistDto: CreatePlaylistDto) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editPlaylist(
    @Param('videoid') videoid: string,
    @Body() updateDto: UpdatePlaylistDto,
  ) {}

  @Delete(':id')
  deletePlaylist(@Param('id') id: string) {
    return this.playListService.deletePlaylist(id);
  }
}
