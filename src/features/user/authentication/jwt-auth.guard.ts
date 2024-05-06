import {
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decodedToken: any = jwt.verify(token, process.env.SECRETKEY);
      // req.user = decodedToken;
    }
    next();
  }
}
