import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async createPrefect(name: string, groupName: string) {
    return await this.databaseService.user.create({
      data: {
        name: name,
        role: 'PREFECT',
        group: {
          create: {
            name: groupName,
          },
        },
      },
    });
  }

  async createStudent(name: string, groupId: string) {
    return this.databaseService.user.create({
      data: {
        name: name,
        role: 'STUDENT',
        group: {
          connect: {
            id: groupId,
          },
        },
      },
    });
  }

  // TODO: Set credentials to access app in future
}
