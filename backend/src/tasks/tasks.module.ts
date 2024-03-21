import { DatabaseModule } from 'src/database/database.module';

import { Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
