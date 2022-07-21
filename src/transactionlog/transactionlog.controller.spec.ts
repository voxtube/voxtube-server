import { Test, TestingModule } from '@nestjs/testing';
import { TransactionlogController } from './transactionlog.controller';
import { TransactionlogService } from './transactionlog.service';

describe('TransactionlogController', () => {
  let controller: TransactionlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionlogController],
      providers: [TransactionlogService],
    }).compile();

    controller = module.get<TransactionlogController>(TransactionlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
