import { DatabaseModule } from 'src/database/database.module';

import { Module } from '@nestjs/common';

import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [DatabaseModule],
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [GroupsService],
})
export class GroupsModule {}
