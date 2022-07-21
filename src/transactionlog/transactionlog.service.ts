import { TransactionLog } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateTransactionLog } from 'src/shared/dto/update-transaction';

@Injectable()
export class TransactionlogService {
  constructor(private readonly prismaService: PrismaService) {}
  create(transactionlogDto: TransactionLog) {
    return this.prismaService.transactionLog.create({
      data: transactionlogDto,
    });
  }

  findAll(): Promise<TransactionLog[]> {
    return this.prismaService.transactionLog.findMany();
  }

  findOne(id: string): Promise<TransactionLog> {
    return this.prismaService.transactionLog.findFirst({ where: { id } });
  }

  update(id: string, updateTransactionlogDto: UpdateTransactionLog) {
    return this.prismaService.transactionLog.update({
      data: updateTransactionlogDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.transactionLog.delete({ where: { id } });
  }
}
