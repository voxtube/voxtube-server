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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async flagVideo(
    @Request() req: any,
    @Body() createReportDto: CreateReportDto,
  ) {
    createReportDto.userid = req.user.id;

    return this.reportService.flagVideo(createReportDto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getFlaggedVideos() {
    return this.reportService.getReports();
  }

  @Get(':id')
  getFlaggedVideo(@Param('id') id: string) {
    return this.reportService.getReportById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteFlaggedVideo(@Param('id') id: string) {
    return this.reportService.deleteReport(id);
  }
}
