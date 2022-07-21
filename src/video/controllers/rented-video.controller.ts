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
import { RentedVideoDto } from '../dto/create-rented.dto';
import { RentedVideoService } from '../services/rented-video.service';

@ApiTags('Rented Videos')
@Controller('/video/rented')
export class RentedVideoController {
  constructor(private readonly rentedVideoService: RentedVideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createRentedVideo(
    @Body() rentedVideoDto: RentedVideoDto,
    @Request() req: any,
  ) {
    rentedVideoDto.userid = req.user.id;
    return this.rentedVideoService.createRentedVideo(rentedVideoDto);
  }

  @Get()
  getAllRentedVideos() {
    return this.rentedVideoService.getAllRentedVideos();
  }

  @Get(':id')
  getPurchasedVideosById(@Param('id') id: string) {
    return this.rentedVideoService.getRentedVideosById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-rented')
  getUserRentedVideo(@Request() req: any) {
    return this.rentedVideoService.getUserRentedVideos(req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteVideo(@Param('id') id: string) {
    return this.rentedVideoService.deleteRentedVideo(id);
  }
}
