import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSubscribeDto } from '../dto/create-subscribe.dto';
import { SubscribeService } from '../services/subscribe.service';

@ApiTags('Channel Subscribe')
@Controller('/channel/:channelid/subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  subscribeToChannel(
    @Body() createSubscribeDto: CreateSubscribeDto,
    @Param('channelid') channelid: string,
    @Request() req: any,
  ) {
    createSubscribeDto.channelid = channelid;
    createSubscribeDto.userid = req.user.id;

    return this.subscribeService.subscribeToChannel(createSubscribeDto);
  }

  // getting channel subscribers
  @Get('subscribers')
  getChannelSubscribers(@Param('channelid') channelid: string) {
    return this.subscribeService.getSubcribers(channelid);
  }

  // getting channel subscribers count
  @Get('count')
  getChannelSubscribersCount(@Param('channelid') channelid: string) {
    return this.subscribeService.subscribersCount(channelid);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  unsubscribeFromChannel(
    @Param('channelid') channelid: string,
    @Request() req: any,
  ) {
    console.log(channelid);
    return this.subscribeService.unsubscribeFromChannel(channelid, req.user.id);
  }
}
