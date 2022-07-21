import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TosDto {
  @ApiProperty({
    example: 'the terms of service of koitube is bla bla',
    description: 'Terms and conditions ',
  })
  @IsNotEmpty()
  content: string;
}
