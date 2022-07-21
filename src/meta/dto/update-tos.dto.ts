import { PartialType } from '@nestjs/swagger';
import { TosDto } from './tos.dto';

export class UpdateTosDto extends PartialType(TosDto) {}
