import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateGroupDto } from './dtos/create-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  createGroup(@Body() group: CreateGroupDto) {
    return this.groupsService.createGroup(group);
  }
}
