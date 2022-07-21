import { Role } from '.prisma/client';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UpdateTosDto } from '../dto/update-tos.dto';
import { TosService } from '../services/tos.service';

@ApiTags('tos')
@Controller('/tos')
export class TosController {
  constructor(private readonly tosService: TosService) {}

  @Get()
  getTos() {
    return this.tosService.findTos();
  }

  @Auth(Role.Admin, Role.Super)
  @Patch()
  updateTos(@Body() updateDto: UpdateTosDto) {
    return this.tosService.updateTos(updateDto);
  }
}
