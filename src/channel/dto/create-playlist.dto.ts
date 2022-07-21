import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ required: true, example: 'channel-name' })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ required: true, example: 'channel-description' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ required: true, example: 'hjjgffhg6768gfhgdgf' })
  @IsOptional()
  channelId: string;

  @ApiPropertyOptional({ required: true, example: 'dsf_sZSd2edsd' })
  @IsOptional()
  thumbnailId: string;

  @ApiPropertyOptional({ required: true, example: 'https://bla-bla.com' })
  @IsOptional()
  thumbnailUrl: string;
}
