import { CodesGateway } from 'src/gateways/codes.gateway';

import { Module } from '@nestjs/common';

import { CodesController } from './codes.controller';
import { CodesService } from './codes.service';

@Module({
  imports: [],
  providers: [CodesService, CodesGateway],
  controllers: [CodesController],
})
export class CodesModule {}
