import { Tos } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TosDto } from '../dto/tos.dto';
import { UpdateTosDto } from '../dto/update-tos.dto';

@Injectable()
export class TosService {
  constructor(private readonly prismaService: PrismaService) {}

  findTos(): Promise<Tos> {
    return this.prismaService.tos.findFirst();
  }

  updateTos(updateTos: UpdateTosDto) {
    return this.prismaService.tos.updateMany({ data: updateTos });
  }
}
