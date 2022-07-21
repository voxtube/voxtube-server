import { Test, TestingModule } from '@nestjs/testing';
import { TransactionlogService } from './transactionlog.service';

describe('TransactionlogService', () => {
  let service: TransactionlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionlogService],
    }).compile();

    service = module.get<TransactionlogService>(TransactionlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
