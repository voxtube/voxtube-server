import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VideoActionDto } from '../dto/video-actions.dto';
import { VideoActionService } from '../services/video-actions.service';

@Controller('/video/action')
@ApiTags('Video Action')
export class VideoActionController {
  constructor(private readonly actionService: VideoActionService) {}
  // this route is responsible for liking a video
  @UseGuards(JwtAuthGuard)
  @Post('like')
  likeVideo(@Body() actionDto: VideoActionDto, @Request() req) {
    actionDto.userid = req.user.id;
    return this.actionService.likeVideo(actionDto);
  }

  // this route is responsible for disliking a video
  @UseGuards(JwtAuthGuard)
  @Post('dislike')
  dislikeVideo(@Body() actionDto: VideoActionDto, @Request() req) {
    actionDto.userid = req.user.id;
    return this.actionService.dislikeVideo(actionDto);
  }
}
