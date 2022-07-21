import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MiscService } from '../services/misc.service';

@ApiTags('miscellaneous')
@Controller('/channel/:channelid/misc')
export class MiscController {
  constructor(private readonly miscService: MiscService) {}
}
