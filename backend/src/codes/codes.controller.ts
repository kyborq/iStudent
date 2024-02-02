import { Controller, Get, Post } from '@nestjs/common';
import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {
  constructor(private codesService: CodesService) {}

  @Get()
  generateCode() {
    return this.codesService.generateCode();
  }

  @Get(':id')
  getCode() {
    // Get existed code from db
  }

  @Post()
  saveCode() {
    // Save code in db
  }
}
