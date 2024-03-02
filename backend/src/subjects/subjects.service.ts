import { DatabaseService } from 'src/database/database.service';

import { Injectable } from '@nestjs/common';

import { CreateSubjectDto } from './dtos/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private database: DatabaseService) {}

  async getSubjects(groupId: string) {
    const subjects = await this.database.subject.findMany({
      where: { groupId },
    });
    return subjects;
  }

  async createSubject(groupId: string, subject: CreateSubjectDto) {
    const newSubject = await this.database.subject.create({
      data: {
        name: subject.name,
        teacherName: subject.teacher,
        groupId,
      },
    });
    return newSubject;
  }
}
