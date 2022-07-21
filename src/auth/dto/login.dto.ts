import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({
    required: true,
    description: 'Username or email',
    example: 'example@mail.com',
  })
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  username: string;

  @ApiProperty({
    required: true,
    description: 'User password',
    example: '12345678',
  })
  password: string;
}
