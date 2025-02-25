import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import Unauthorized from '../../../errors/unauthorized';

export async function isAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Unauthorized('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, process.env.APP_SECRET as string);

    response.locals = {
      userId: sub,
    };

    next();
  } catch (error) {
    throw new Unauthorized('Invalid token');
  }
}
