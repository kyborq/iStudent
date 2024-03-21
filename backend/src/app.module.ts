import { Module } from '@nestjs/common';
import { CodesModule } from './codes/codes.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SubjectsModule } from './subjects/subjects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CodesModule,
    GroupsModule,
    UsersModule,
    AuthModule,
    SubjectsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
