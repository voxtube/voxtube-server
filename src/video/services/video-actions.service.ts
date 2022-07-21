import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VideoActionDto } from '../dto/video-actions.dto';

@Injectable()
export class VideoActionService {
  constructor(private readonly prismaService: PrismaService) {}

  getLikeCount(videoid: string): Promise<number> {
    return this.prismaService.like.count({
      where: { videoid },
    });
  }

  getDislikeCount(videoid: string): Promise<number> {
    return this.prismaService.dislike.count({
      where: { videoid },
    });
  }

  async likeVideo(actionDto: VideoActionDto) {
    // get liked videos
    const likes = await this.prismaService.like.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    // get dislike videos
    const dislike = await this.prismaService.dislike.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    // check if the user dislike video and then pull it out of db
    if (dislike)
      await this.prismaService.dislike.delete({ where: { id: dislike.id } });

    // if user like the video already video will be unlike
    if (likes) {
      await this.prismaService.like.delete({ where: { id: likes.id } });
      return { likes: await this.getLikeCount(actionDto.videoid) };
    } else {
      const likes = await this.prismaService.like.create({ data: actionDto });
      return { likes: await this.getLikeCount(likes.videoid) };
    }
  }

  async dislikeVideo(actionDto: VideoActionDto) {
    // check whther the video us dislike or not
    const dislike = await this.prismaService.dislike.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    // check the video if it liked or not
    const like = await this.prismaService.like.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    // if the video is liked then it will be unlike
    if (like) await this.prismaService.like.delete({ where: { id: like.id } });

    // if dislike then we remove it from db
    if (dislike) {
      await this.prismaService.dislike.delete({ where: { id: dislike.id } });
      return { dislikes: await this.getLikeCount(actionDto.videoid) };
    }
    // else the video will be disliked
    else {
      const dislikes = await this.prismaService.dislike.create({
        data: actionDto,
      });
      return { dislikes: await this.getDislikeCount(dislikes.videoid) };
    }
  }
}
