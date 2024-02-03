import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private readonly jwtAccessSecret: string;
  private readonly jwtRefreshSecret: string;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.jwtAccessSecret = configService.get('JWT_ACCESS_SECRET');
    this.jwtRefreshSecret = configService.get('JWT_REFRESH_SECRET');
  }

  private async getValidUser(userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.token) {
      throw new ForbiddenException('Авторизация истекла, повторите вход');
    }
    return user;
  }

  private async generateTokens(userId: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId },
      { secret: this.jwtAccessSecret, expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { secret: this.jwtRefreshSecret, expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.setRefreshToken(userId, hashedRefreshToken);
  }

  private async issueTokens(userId: string) {
    const tokens = await this.generateTokens(userId);
    return tokens;
  }

  async loginUser(loginDto: LoginUserDto) {
    const user = await this.usersService.getByLogin(loginDto.login);

    if (!user) {
      throw new NotFoundException('Такого пользователя не существует');
    }

    const passwordMatch = await argon2.verify(user.password, loginDto.password);
    if (!passwordMatch) {
      throw new BadRequestException('Неправильный логин или пароль');
    }

    const tokens = await this.issueTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async registerPrefect(registerDto: RegisterUserDto) {
    const hashedPassword = await argon2.hash(registerDto.password);

    const user = await this.usersService.createPrefect({
      ...registerDto,
      password: hashedPassword,
    });

    const tokens = await this.issueTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async registerStudent(registerDto: RegisterUserDto) {
    const hashedPassword = await argon2.hash(registerDto.password);

    const user = await this.usersService.createStudent({
      ...registerDto,
      password: hashedPassword,
    });

    const tokens = await this.issueTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logoutUser(userId: string) {
    await this.usersService.removeToken(userId);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.getValidUser(userId);

    const refreshTokenMatches = argon2.verify(user.token, refreshToken);
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Авторизация истекла, повторите вход');
    }

    return this.issueTokens(user.id);
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersService.getUserInfo(userId);
    return user;
  }
}
