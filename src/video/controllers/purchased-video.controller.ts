import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PurchasedVideosDto } from '../dto/create-purchase.dto';
import { PurchasedService } from '../services/purchased-video.services';

@ApiTags('Purchased Videos')
@Controller('/video/purchased')
export class PurchasedController {
  constructor(private readonly purchasedService: PurchasedService) {}

  // route for creating purchased by any loggedin user
  @UseGuards(JwtAuthGuard)
  @Post()
  createPurchase(
    @Body() purchasedVideoDto: PurchasedVideosDto,
    @Request() req: any,
  ) {
    purchasedVideoDto.userid = req.user.id;
    return this.purchasedService.createPurchase(purchasedVideoDto);
  }

  // admin route for fetching all purchased videos
  @Get()
  getAllPurchasedVideos() {
    return this.purchasedService.getAllPurchasedVideos();
  }

  // route for fetching purchased video by id
  @Get(':id')
  getPurchasedVideosById(@Param('id') id: string) {
    const purchasedVideo = this.purchasedService.getPurchasedVideosById(id);

    if (!purchasedVideo)
      throw new BadRequestException('invalid purchase requested');

    return purchasedVideo;
  }

  // route for user purchased video
  @UseGuards(JwtAuthGuard)
  @Get('my-purchased')
  getUserPurchasedVideo(@Request() req: any) {
    return this.purchasedService.getUserPurchasedVideos(req.user.id);
  }
}
