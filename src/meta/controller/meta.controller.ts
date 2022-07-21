import { Controller } from '@nestjs/common';
import { MetaService } from '../services/meta.service';

@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}
}
