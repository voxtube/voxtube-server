import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PurchasedVideosDto {
  @ApiProperty({ required: true, example: 'ckv7t2sqq00080scwyfcdanu9' })
  @IsNotEmpty()
  videoid: string;

  @IsOptional()
  userid: string;
}
