import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, Role } from '@prisma/client';
import { RoleDto } from '../dto/role_dto';
import { comparePassword } from 'src/utils/password.bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // creating user
  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: userDto,
    });

    // deleting password from object so that we dont return sensitive data
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    // removing all passwords
    users.forEach((u) => {
      delete u.password;
    });

    return users;
  }

  // find user by id
  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    // removing password from object
    user && delete user.password;

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    // remove password from users only if it exist
    user && delete user.password;

    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    // remove password from users only if it exist
    user && delete user.password;

    return user;
  }

  // getting the total number of users
  async usersCount() {
    const users = await this.prismaService.user.count();
    return { users };
  }

  // fetching user record by username or email
  async findByUserNameOrEmail(username: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email: username }],
      },
    });
  }

  // update user data
  async setUserRole(
    user: User,
    userId: string,
    roleDto: RoleDto,
  ): Promise<User> {
    await this.UserNotFoundException(userId);
    if (user.role == Role.Admin && roleDto.role == Role.Super)
      throw new UnauthorizedException();
    return this.prismaService.user.update({
      data: roleDto,
      where: { id: userId },
    });
  }

  // update user data
  async updateUser(id: string, userDto: UpdateUserDto): Promise<User> {
    const user = await this.prismaService.user.update({
      data: userDto,
      where: { id },
    });

    // removing password from object
    delete user.password;

    return user;
  }

  // deleting User data
  async deleteUser(id: string): Promise<User> {
    const user = await this.prismaService.user.delete({ where: { id } });

    delete user.password;

    return user;
  }

  // get user subscribed channels
  async getUserSubscribedChannels(userid: string) {
    return this.prismaService.channel.findMany({
      where: {
        subscribe: {
          some: { userid },
        },
      },
      include: { subscribe: true, user: true, _count: true },
    });
  }

  async UserNotFoundException(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });
    if (!user) throw new BadRequestException('User not found');
  }

  async checkPassword(userid: string, password: string) {
    if (!password) throw new BadRequestException('Password required');
    const user = await this.prismaService.user.findFirst({
      where: { id: userid },
    });
    const isMatch: boolean = await comparePassword(password, user.password);
    return {
      match: isMatch,
    };
  }
}
