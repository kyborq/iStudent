import { DatabaseService } from 'src/database/database.service';

import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private database: DatabaseService) {}

  async createTask(groupId: string, authorId: string, taskDto: CreateTaskDto) {
    const createdTask = await this.database.task.create({
      data: {
        ...taskDto,
        group: {
          connect: { id: groupId },
        },
      },
    });

    return createdTask;
  }

  async deleteTask(taskId: string) {}

  async updateTask() {
    // ...
  }

  async completeTask() {
    // ...
  }
}
