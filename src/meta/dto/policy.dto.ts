import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PolicyDto {
  @ApiProperty({
    example: 'the policy of koitube is bla bla',
    description: 'Terms and conditions ',
  })
  @IsNotEmpty()
  content: string;
}
