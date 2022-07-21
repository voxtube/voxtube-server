import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class VideoActionDto {
  @ApiProperty({ required: true, example: 'ckv7t2sqq00080scwyfcdanu9' })
  @IsNotEmpty()
  videoid: string;

  @ApiProperty({
    required: false,
    example: 'ckv7t2sqq00080scwyfcdanu9',
    description: 'this field willl be automatically provided by server @Requet',
  })
  @IsOptional()
  userid: string;
}
