import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from '.prisma/client';
import { RoleDto } from '../dto/role_dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/byid/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/users_count')
  getUsersCount() {
    return this.usersService.usersCount();
  }

  @Get('/byemail/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('/byusername/:username')
  getUserByUserName(@Param('username') username: string) {
    return this.usersService.findByUserName(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscribed')
  getUserSubscribedChannels(@Request() req: any) {
    return this.usersService.getUserSubscribedChannels(req.user.id);
  }

  @Auth(Role.Super, Role.Admin, Role.User)
  @Post('/role/:id')
  setUserRole(
    @Param('id') id: string,
    @Body() roleDto: RoleDto,
    @Request() req,
  ) {
    return this.usersService.setUserRole(req.user, id, roleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check-password')
  checkUserPassword(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.usersService.checkPassword(req.user.id, updateUserDto.password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
