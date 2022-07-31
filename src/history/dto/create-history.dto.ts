import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  @ApiProperty({ required: true, example: 'CvD344erCSas' })
  @IsNotEmpty()
  videoid: string;

  userid: string;

  @ApiProperty({ required: true, example: 'CvD344erCSas' })
  @IsNotEmpty()
  channelid: string;
}
