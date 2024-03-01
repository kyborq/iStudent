import { UserId } from 'src/common/decorators/user-id.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

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

  @Get()
  @UseGuards(AccessTokenGuard)
  getClassmates(@UserId() userId: string) {
    return this.usersService.getClassmates(userId);
  }
}
