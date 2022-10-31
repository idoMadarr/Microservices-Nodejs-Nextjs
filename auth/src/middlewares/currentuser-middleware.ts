import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { DecodedPayload } from '../@types/express';

export const currentUserMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const decoded = verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as DecodedPayload;
    req.currentUser = decoded;
  } catch (error) {
    console.error(error);
  }
  next();
};
