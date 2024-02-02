import { Controller, Get, Param, Post } from '@nestjs/common';

import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {
  constructor(private codesService: CodesService) {}

  @Get(':client')
  generateCode(@Param('client') client: string) {
    return this.codesService.generateCode(client);
  }

  @Post(':client')
  saveCode(@Param('client') client: string) {
    // Save code in db
    this.codesService.saveCode(client);
  }
}
