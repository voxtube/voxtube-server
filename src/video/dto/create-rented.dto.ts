import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class RentedVideoDto {
  @ApiProperty({ required: true, example: 'ckv7t2sqq00080scwyfcdanu9' })
  videoid: string;

  @ApiProperty({ required: true, example: '' })
  @IsDateString()
  duration: string;

  @ApiProperty({ required: true, example: 'ckv7t2sqq00080scwyfcdanu9' })
  @IsOptional()
  userid: string;
}
