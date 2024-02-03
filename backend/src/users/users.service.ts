import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async createPrefect(userDto: CreateUserDto) {
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
}
