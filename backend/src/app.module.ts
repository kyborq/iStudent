import { Module } from '@nestjs/common';
import { CodesModule } from './codes/codes.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CodesModule, GroupsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
