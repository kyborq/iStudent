import { Request } from 'express';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserGroup = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user['groupId'];
  },
);
