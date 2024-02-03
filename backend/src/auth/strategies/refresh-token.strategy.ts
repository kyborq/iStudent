import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new ForbiddenException('Access denied');
    }
    return { ...payload, refreshToken };
  }
}

const cookieExtractor = (req: Request): string | null => {
  if (req && req.cookies) {
    return req.cookies['refreshToken'];
  }
  return null;
};
