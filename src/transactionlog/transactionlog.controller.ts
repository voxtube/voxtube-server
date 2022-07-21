import { TransactionLog } from '.prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateTransactionLog } from 'src/shared/dto/update-transaction';
import { TransactionlogService } from './transactionlog.service';
@Controller('transactionlog')
export class TransactionlogController {
  constructor(private readonly transactionlogService: TransactionlogService) {}

  @Post()
  create(@Body() createTransactionlogDto: TransactionLog) {
    return this.transactionlogService.create(createTransactionlogDto);
  }

  @Get()
  findAll() {
    return this.transactionlogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionlogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionlogDto: UpdateTransactionLog,
  ) {
    return this.transactionlogService.update(id, updateTransactionlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionlogService.remove(id);
  }
}
