import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TransferDto {
  @ApiPropertyOptional({
    example: 'asdasd65as4crsc',
    required: false,
    description: 'the user id that will send money',
  })
  @IsOptional()
  userid: string;

  @ApiProperty({
    example: '345v34ft45g6dfdgfd',
    required: true,
    description: 'the id of the who is recieving money',
  })
  @IsNotEmpty()
  recieverid: string;

  @ApiProperty({
    required: true,
    example: 200,
  })
  @IsNumber()
  amount: number;
}
