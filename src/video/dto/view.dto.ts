import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ViewDto {
  @ApiProperty({ required: true, example: 'ckv7t2sqq00080scwyfcdanu9' })
  @IsNotEmpty()
  videoid: string;

  @ApiProperty({
    required: false,
    example: 'ckv7t2sqq00080scwyfcdanu9',
    description: 'this field is for adding channel id',
  })
  @IsOptional()
  channelid: string;

  @ApiProperty({
    required: false,
    example: 'ckv7t2sqq00080scwyfcdanu9',
    description: 'this field willl be automatically provided by server @Requet',
  })
  @IsOptional()
  userid: string;
}
