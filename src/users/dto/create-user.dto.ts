import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  // validating email to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'mak23',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  username: string;

  // checking if email is empty or not
  @ApiProperty({
    required: true,
    example: 'example@mail.com',
  })
  @IsEmail()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  email: string;

  // validating country to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'Nigeria',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  country: string;

  // validating if the form data is a valid email
  @ApiProperty({
    required: true,
    example: '12345678  ',
  })
  @Length(8)
  password: string;
}
