import { Module } from '@nestjs/common';
import { CodesModule } from './codes/codes.module';

@Module({
  imports: [CodesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
