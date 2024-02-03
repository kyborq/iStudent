import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.authService.loginUser(loginDto);
  }

  @Post('prefect')
  @HttpCode(HttpStatus.CREATED)
  registerPrefect(@Body() registerDto: RegisterUserDto) {
    return this.authService.loginUser(registerDto);
  }

  @Post('student')
  @HttpCode(HttpStatus.CREATED)
  registerStudent(@Body() registerDto: RegisterUserDto) {
    return this.authService.loginUser(registerDto);
  }
}
