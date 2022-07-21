import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/services/users.service';
import { comparePassword, hashPassword } from 'src/utils/password.bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  // validateUser(email: string, password: string) {}

  tokenResponder(id: string) {
    const token = this.generateToken({ id });
    return { token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUserNameOrEmail(
      loginDto.username,
    );

    if (!user) throw new BadRequestException('Invalid credentials');

    const passwordMatch: boolean = await comparePassword(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) throw new BadRequestException('Invalid credentials');

    // generating token
    return this.tokenResponder(user.id);
  }

  async signup(userDto: CreateUserDto) {
    const userByUserName = await this.userService.findByUserName(
      userDto.username,
    );
    const userByEmail = await this.userService.findByEmail(userDto.email);

    // checking if the email registered
    if (userByUserName) throw new BadRequestException('Username already taken');

    // checking if the email is already registered
    if (userByEmail) throw new BadRequestException('Email already taken');

    // hashing password
    userDto.password = await hashPassword(userDto.password);

    // registering user
    const user = await this.userService.create(userDto);

    // returning the token
    return this.tokenResponder(user.id);
  }
}
