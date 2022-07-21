import { Module } from '@nestjs/common';
import { TransactionlogService } from './transactionlog.service';
import { TransactionlogController } from './transactionlog.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TransactionlogController],
  providers: [TransactionlogService, PrismaService],
})
export class TransactionlogModule {}
