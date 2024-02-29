import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('prefect')
  createPrefect(@Body() createPrefectDto: CreateUserDto) {
    return this.usersService.createPrefect(createPrefectDto);
  }

  @Post('student')
  createStudent(@Body() createStudentDto: CreateUserDto) {
    return this.usersService.createStudent(createStudentDto);
  }
}
