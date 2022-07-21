import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChannelService } from '../services/channel.service';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { UpdateChannelDto } from '../dto/update-channel.dto';

@ApiTags('Channel')
@Controller('/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post()
  createChannel(@Request() req, @Body() createChannelDto: CreateChannelDto) {
    createChannelDto.userId = req.user.id;
    return this.channelService.create(createChannelDto);
  }

  @Get()
  findAllChannel() {
    return this.channelService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/mychannel')
  findUserChannel(@Request() req) {
    return this.channelService.findUserChannels(req.user.id);
  }

  @Get('/byid/:id')
  findChannelById(@Param('id') id: string) {
    return this.channelService.findChannelById(id);
  }

  @Get('/byname/:name')
  findChannelByName(@Param('name') name: string) {
    return this.channelService.findChannelByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateChannel(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
    @Request() req,
  ) {
    updateChannelDto.userId = req.user.id;
    return this.channelService.update(id, updateChannelDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteChannel(@Param('id') id: string) {
    return this.channelService.delete(id);
  }
}
