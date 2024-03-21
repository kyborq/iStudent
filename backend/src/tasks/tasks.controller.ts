import { UserGroup } from 'src/common/decorators/user-group.decorator';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

import { Controller, Post, UseGuards } from '@nestjs/common';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AccessTokenGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@UserId() user: string, @UserGroup() group: string) {}
}
