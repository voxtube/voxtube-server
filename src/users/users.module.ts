import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from 'src/prisma.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { TransactionlogService } from 'src/transactionlog/transactionlog.service';

@Module({
  imports: [],
  controllers: [UsersController, TransactionController],
  providers: [
    UsersService,
    PrismaService,
    TransactionService,
    TransactionlogService,
  ],
})
export class UsersModule {}
