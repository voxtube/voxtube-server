import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ required: true, example: 'channel-name' })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ required: true, example: 'channel-description' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ required: true, example: 'hjjgffhg6768gfhgdgf' })
  @IsOptional()
  userId: string;
}
