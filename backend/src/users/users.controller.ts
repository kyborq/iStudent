import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { CreatePrefectDto } from './dtos/create-prefect.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('prefect')
  createPrefect(@Body() createPrefectDto: CreatePrefectDto) {
    this.usersService.createPrefect(
      createPrefectDto.name,
      createPrefectDto.group,
    );
  }

  @Post('student')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    this.usersService.createStudent(
      createStudentDto.name,
      createStudentDto.groupId,
    );
  }
}
