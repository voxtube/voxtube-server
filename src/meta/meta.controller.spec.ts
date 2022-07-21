import { Test, TestingModule } from '@nestjs/testing';
import { MetaController } from './controller/meta.controller';
import { MetaService } from './services/meta.service';

describe('MetaController', () => {
  let controller: MetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaController],
      providers: [MetaService],
    }).compile();

    controller = module.get<MetaController>(MetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
