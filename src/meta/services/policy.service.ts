import { Tos } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdatePolicyDto } from '../dto/update-policy.dto';

@Injectable()
export class PolicyService {
  constructor(private readonly prismaService: PrismaService) {}

  findPolicy(): Promise<Tos> {
    return this.prismaService.policy.findFirst();
  }

  updatePolicy(updatePolicy: UpdatePolicyDto) {
    return this.prismaService.policy.updateMany({ data: updatePolicy });
  }
}
