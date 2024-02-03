import { Module } from '@nestjs/common';
import { CodesModule } from './codes/codes.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CodesModule, GroupsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
