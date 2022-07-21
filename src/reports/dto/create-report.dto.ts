import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ required: true, example: 'ckv7t2sqq00080scwyfcdanu9' })
  @IsNotEmpty()
  videoid: string;

  @IsOptional()
  userid: string;

  @IsOptional()
  @Length(5, 255)
  content?: string;
}
