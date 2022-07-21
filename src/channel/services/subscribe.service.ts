import { Subscribe, User } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubscribeDto } from '../dto/create-subscribe.dto';
import { ChannelService } from './channel.service';

@Injectable()
export class SubscribeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelService: ChannelService,
  ) {}

  /**
   *
   * @param createSubscribeDto
   * @returns Subscribe
   * @description add a channel to user subscribe table
   */
  async subscribeToChannel(
    createSubscribeDto: CreateSubscribeDto,
  ): Promise<Subscribe> {
    // check if user has already subscribed to channel
    const subscriptionExists = await this.prismaService.subscribe.findFirst({
      where: {
        userid: createSubscribeDto.userid,
        channelid: createSubscribeDto.channelid,
      },
    });
    if (subscriptionExists)
      throw new BadRequestException('user already subscribed');

    return this.prismaService.subscribe.create({
      data: createSubscribeDto,
      include: { channel: true, user: true },
    });
  }

  /**
   *
   * @param channelid
   * @returns User[]
   * @description get users that subscribe to a channel
   */
  async getSubcribers(channelid: string): Promise<User[]> {
    // check if channel exists
    const channelExists = await this.channelService.findChannelById(channelid);
    if (!channelExists) throw new BadRequestException('invalid channel');

    // getting all users base which subscribe to @channelid
    return this.prismaService.user.findMany({
      where: {
        subscribe: {
          some: {
            channelid,
          },
        },
      },
      include: { subscribe: true },
    });
  }

  async subscribersCount(channelid: string): Promise<{ count }> {
    const count = await this.prismaService.subscribe.count({
      where: { channelid },
    });
    return { count };
  }

  /**
   *
   * @param id
   * @returns Subscribe
   * @description Unsubscribe users
   */
  async unsubscribeFromChannel(
    channelid: string,
    userid: string,
  ): Promise<Subscribe> {
    const subscription = await this.prismaService.subscribe.findFirst({
      where: {
        channelid: channelid,
        userid: userid,
      },
    });

    if (!subscription)
      throw new BadRequestException('user is not subscibed to this channel');

    return this.prismaService.subscribe.delete({
      where: { id: subscription.id },
    });
  }
}
