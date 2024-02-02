import { Module } from '@nestjs/common';
import { CodesModule } from './codes/codes.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [CodesModule, GroupsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
