import { Role } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class RoleDto {
  @ApiProperty({
    required: true,
    enum: Role,
    enumName: 'Role',
    description: 'enum for role',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
