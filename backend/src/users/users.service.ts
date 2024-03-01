import { DatabaseService } from 'src/database/database.service';

import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async getUserInfo(userId: string): Promise<GetUserDto> {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        login: true,
        name: true,
        role: true,
      },
    });

    return user;
  }

  async getUserById(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

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

  async getClassmates(userId: string) {
    const user = await this.getUserById(userId);

    const classmates = await this.databaseService.user.findMany({
      where: { groupId: user.groupId },
    });

    return classmates;
  }
}
