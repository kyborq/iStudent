import { UserId } from 'src/common/decorators/user-id.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {
  constructor(private codesService: CodesService) {}

  @Get(':client')
  generateCode(@Param('client') client: string) {
    return this.codesService.generateCode(client);
  }

  @Post(':client')
  @UseGuards(AccessTokenGuard)
  saveCode(@Param('client') client: string, @UserId() prefectId: string) {
    this.codesService.saveCode(client, prefectId);
  }
}
