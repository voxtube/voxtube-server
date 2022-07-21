import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class TopUpDto {
  @ApiPropertyOptional({
    required: false,
    example: '3e5vv43b5tv3546x',
  })
  @IsOptional()
  userid: string;

  @ApiProperty({
    required: true,
    example: 3000,
  })
  @IsNumber()
  amount: number;
}
