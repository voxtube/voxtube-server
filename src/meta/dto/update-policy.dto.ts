import { PartialType } from '@nestjs/swagger';
import { PolicyDto } from './policy.dto';

export class UpdatePolicyDto extends PartialType(PolicyDto) {}
