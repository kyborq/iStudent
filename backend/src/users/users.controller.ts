import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('prefect')
  createPrefect(@Body() createPrefectDto: CreateUserDto) {
    this.usersService.createPrefect(createPrefectDto);
  }

  @Post('student')
  createStudent(@Body() createStudentDto: CreateUserDto) {
    this.usersService.createStudent(createStudentDto);
  }
}
