import { CodesGateway } from 'src/gateways/codes.gateway';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';

import { Module } from '@nestjs/common';

import { CodesController } from './codes.controller';
import { CodesService } from './codes.service';

@Module({
  imports: [UsersModule, GroupsModule],
  providers: [CodesService, CodesGateway],
  controllers: [CodesController],
})
export class CodesModule {}
