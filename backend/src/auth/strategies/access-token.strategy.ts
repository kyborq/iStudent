import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

export type JwtPayload = {
  sub: string;
  groupId: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: false,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}

const cookieExtractor = (req: Request): string | null => {
  if (req && req.cookies) {
    return req.cookies['jwt'];
  }
  return null;
};
