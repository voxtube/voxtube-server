import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateSubscribeDto {
  @ApiProperty({
    required: true,
    description: 'Channel id to be extracted from url',
    example: 'jdkjksjd809830ekjdjs',
  })
  @IsOptional()
  userid: string;

  @ApiProperty({
    required: true,
    description: 'userid to be extracted from request header',
    example: 'jdkjksjd809830ekjdjs',
  })
  @IsOptional()
  channelid: string;
}
