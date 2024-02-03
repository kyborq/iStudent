import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async getByLogin(login: string) {
    const user = await this.databaseService.user.findFirst({
      where: { login },
    });

    return user;
  }

  async createPrefect(userDto: CreateUserDto) {
    const user = await this.getByLogin(userDto.login);

    if (user) {
      throw new BadRequestException('Такой пользователь уже существует');
    }

    return await this.databaseService.user.create({
      data: {
        name: userDto.name,
        role: 'PREFECT',
        login: userDto.login,
        password: userDto.password,
        group: {
          create: {
            name: userDto.group,
          },
        },
      },
    });
  }

  async createStudent(userDto: CreateUserDto) {
    const user = await this.getByLogin(userDto.login);

    if (user) {
      throw new BadRequestException('Такой пользователь уже существует');
    }

    return this.databaseService.user.create({
      data: {
        name: userDto.name,
        role: 'STUDENT',
        login: userDto.login,
        password: userDto.password,
        group: {
          connect: {
            id: userDto.group,
          },
        },
      },
    });
  }

  async setRefreshToken(userId: string, token: string) {
    await this.databaseService.user.update({
      data: {
        token,
      },
      where: {
        id: userId,
      },
    });
  }

  async removeToken(userId: string) {
    await this.databaseService.user.updateMany({
      data: {
        token: null,
      },
      where: {
        id: userId,
        token: {
          not: null,
        },
      },
    });
  }
}
