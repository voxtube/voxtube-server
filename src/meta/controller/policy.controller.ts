import { Role } from '.prisma/client';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UpdatePolicyDto } from '../dto/update-policy.dto';
import { PolicyService } from '../services/policy.service';

@ApiTags('policy')
@Controller('/policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  getTos() {
    return this.policyService.findPolicy();
  }

  @Auth(Role.Admin, Role.Super)
  @Patch()
  updateTos(@Body() updateDto: UpdatePolicyDto) {
    return this.policyService.updatePolicy(updateDto);
  }
}
