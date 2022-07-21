import { PartialType } from '@nestjs/swagger';
import { TransactionLogDto } from './create-transaction-log.dto';

export class UpdateTransactionLog extends PartialType(TransactionLogDto) {}
