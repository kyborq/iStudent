import { UserGroup } from 'src/common/decorators/user-group.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CreateSubjectDto } from './dtos/create-subject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
@UseGuards(AccessTokenGuard)
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Get()
  getSubjects(@UserGroup() group: string) {
    return this.subjectsService.getSubjects(group);
  }

  @Post()
  createSubject(@UserGroup() group: string, @Body() subject: CreateSubjectDto) {
    return this.subjectsService.createSubject(group, subject);
  }
}
