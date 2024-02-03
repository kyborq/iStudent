import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async loginUser(loginDto: LoginUserDto) {
    const user = await this.usersService.getByLogin(loginDto.login);

    if (!user) {
      throw new NotFoundException('Такого пользователя не существует');
    }

    const passwordMatch = user.password === loginDto.password;
    if (!passwordMatch) {
      throw new ForbiddenException('Неправильный логин или пароль');
    }

    return user;
  }

  async registerPrefect(registerDto: RegisterUserDto) {
    const user = await this.usersService.createPrefect(registerDto);

    return user;
  }

  async registerStudent(registerDto: RegisterUserDto) {
    const user = await this.usersService.createStudent(registerDto);

    return user;
  }

  async logoutUser(userId: string) {
    await this.usersService.removeToken(userId);
  }
}
