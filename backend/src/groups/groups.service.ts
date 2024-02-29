import { DatabaseService } from 'src/database/database.service';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private database: DatabaseService) {}

  async createGroup(group: Prisma.GroupCreateInput) {
    return await this.database.group.create({
      data: group,
    });
  }

  async getGroupById(id: string) {
    return await this.database.group.findUnique({ where: { id } });
  }
}
