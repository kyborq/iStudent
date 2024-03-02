import { DatabaseModule } from 'src/database/database.module';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';

import { Module } from '@nestjs/common';

import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
  imports: [DatabaseModule, GroupsModule, UsersModule],
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
