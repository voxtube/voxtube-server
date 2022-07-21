import { TransactionStatus, TransactionType } from '.prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class TransactionLogDto {
  @ApiPropertyOptional({ required: true, example: 'hjjgffhg6768gfhgdgf' })
  @IsOptional()
  userid: string;

  @ApiPropertyOptional({ required: true, example: 'hjjgffhg6768gfhgdgf' })
  @IsOptional()
  videoid: string;

  @ApiProperty({ required: true, example: 'hjjgffhg6768gfhgdgf' })
  @IsNotEmpty()
  recieverid: string;

  @ApiProperty({ required: true, example: 'hjjgffhg6768gfhgdgf' })
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    required: true,
    enum: TransactionType,
    example: TransactionType.Purchase,
  })
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({
    required: true,
    enum: TransactionStatus,
    example: TransactionStatus.Pending,
  })
  @IsNotEmpty()
  status: TransactionStatus;
}
