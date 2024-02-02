import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GroupsService {
  constructor(private database: DatabaseService) {}

  async createGroup(group: Prisma.GroupCreateInput) {
    return await this.database.group.create({
      data: group,
    });
  }
}
