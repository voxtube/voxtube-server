import { User } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TopUpDto } from '../dto/topup.dto';
import { TransferDto } from '../dto/transfer.dto';
import { UsersService } from './users.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}
  /**
   *
   * @param userid String
   * @param ammount Number
   * @description toping up user account
   *
   */
  async topUp(topUpDto: TopUpDto) {
    // checking if the user exist and throws exception if the user
    // does not exist
    await this.userService.UserNotFoundException(topUpDto.userid);

    // updating the user balance
    return this.prismaService.user.update({
      data: {
        balance: {
          increment: topUpDto.amount,
        },
      },
      where: { id: topUpDto.userid },
    });
  }

  /**
   *
   * @param userid string
   * @param receiverId string
   * @description transfering money from one user account to another
   */
  async transfer(transferDto: TransferDto): Promise<User[]> {
    // fetching the user details
    const sender = await this.userService.findById(transferDto.userid);
    if (!sender) throw new BadRequestException('User not found');

    // fetching the user details
    const reciever = await this.userService.findById(transferDto.recieverid);
    if (!reciever) throw new BadRequestException('Reciever not found');

    // checking if user has enough funds
    if (sender.balance < transferDto.amount)
      throw new BadRequestException(
        'Not enough balance to make the transaction',
      );

    // updating the sender balance by decrementing the ammount
    const decrementSenderBalance = this.prismaService.user.update({
      data: { balance: { decrement: transferDto.amount } },
      where: { id: transferDto.userid },
    });

    const incrementRecieverBalance = this.prismaService.user.update({
      data: { balance: { increment: transferDto.amount } },
      where: { id: transferDto.recieverid },
    });

    // integrating transactions to deduct the sender account balance
    // provided that the sender has enough funds and also incrementing
    // the reciever balance, if any of the query failed the transaction
    // shall be rollback by prisma using prisma integrated transactions
    return this.prismaService.$transaction([
      decrementSenderBalance,
      incrementRecieverBalance,
    ]);
  }

  widthraw(userid: string) {}
  voucher(iserid: string, voucher: string) {}
}
