import { Module } from '@nestjs/common';
import { MetaService } from './services/meta.service';
import { MetaController } from './controller/meta.controller';
import { PrismaService } from 'src/prisma.service';
import { TosService } from './services/tos.service';
import { TosController } from './controller/tos.controller';
import { PolicyController } from './controller/policy.controller';
import { PolicyService } from './services/policy.service';

@Module({
  controllers: [MetaController, TosController, PolicyController],
  providers: [MetaService, PrismaService, TosService, PolicyService],
})
export class MetaModule {}
