import { UserId } from 'src/common/decorators/user-id.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ClearCookiesInterceptor } from './interceptors/clear-cookies.interceptor';
import { SetCookiesInterceptor } from './interceptors/set-cookies.interceptor';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(SetCookiesInterceptor)
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.authService.loginUser(loginDto);
  }

  @Post('prefect')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(SetCookiesInterceptor)
  registerPrefect(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerPrefect(registerDto);
  }

  @Post('student')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(SetCookiesInterceptor)
  registerStudent(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerStudent(registerDto);
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(SetCookiesInterceptor)
  refresh(
    @UserId() userId: string,
    @User('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClearCookiesInterceptor)
  logoutUser(@UserId() userId: string) {
    return this.authService.logoutUser(userId);
  }

  @Get('current')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  getCurrentUser(@UserId() userId: string) {
    return this.authService.getCurrentUser(userId);
  }
}
