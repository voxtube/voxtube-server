import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ required: true, example: 'hjjgffhg6768gfhgdgf' })
  @IsNotEmpty()
  userId: string;
}
