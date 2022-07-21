import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TopUpDto } from '../dto/topup.dto';
import { TransferDto } from '../dto/transfer.dto';
import { TransactionService } from '../services/transaction.service';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/transfer')
  transfer(@Body() transferDto: TransferDto, @Request() req) {
    transferDto.userid = req.user.id;
    return this.transactionService.transfer(transferDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/withdraw')
  widthraw() {}

  @UseGuards(JwtAuthGuard)
  @Post('/topup')
  topup(@Body() topUpDto: TopUpDto, @Request() req) {
    topUpDto.userid = req.user.id;
    return this.transactionService.topUp(topUpDto);
  }
}
