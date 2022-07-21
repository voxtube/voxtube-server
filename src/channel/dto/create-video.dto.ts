import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({ required: true, example: 'video-name' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  title: string;

  @ApiPropertyOptional({
    required: true,
    example: 'short description about video',
  })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  description: string;

  @ApiPropertyOptional({ required: true, example: 'shjhsjhg8983jnjashh' })
  @IsOptional()
  channelid: string;

  @ApiProperty({
    required: true,
    example: 'jkdsj8898sqd09q9q0qd',
  })
  @IsNotEmpty()
  categoryid: string;

  @ApiPropertyOptional({
    required: true,
    example: 'https://video-thumbnail-url',
  })
  @IsOptional()
  thumbnailUrl: string;

  @ApiProperty({ required: true, example: 'https://video-url' })
  @IsNotEmpty()
  videoUrl: string;

  @ApiProperty({ required: true, example: '32453454ftrgrftegdr' })
  @IsNotEmpty()
  thumbnailId: string;

  @ApiProperty({ required: true, example: 'sadd3d5fr456ty5rtyyt' })
  @IsNotEmpty()
  videoId: string;

  @ApiPropertyOptional({
    required: true,
    description: 'cost of video in naira',
    example: '200',
  })
  @IsOptional()
  price: number;

  @ApiPropertyOptional({
    required: true,
    description: 'cost of rented video in naira',
    example: '200',
  })
  @IsOptional()
  rent_price: number;

  @ApiProperty({
    required: true,
    example: true,
  })
  @IsBoolean()
  isPublish: boolean;

  @ApiProperty({
    required: true,
    example: true,
  })
  @IsBoolean()
  free: boolean;
}
