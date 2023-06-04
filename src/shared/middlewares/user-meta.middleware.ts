import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  private readonly _logger = new Logger(AppMiddleware.name);
  constructor(
    private readonly _jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  public use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'];

    const bearerToken = req.headers.authorization?.split(' ');
    let token: string | { [key: string]: any };
    if (bearerToken) {
      token = this._jwtService.decode(bearerToken[1]);
      req['userId'] = token['id'];
    }

    req['userAgent'] = userAgent;
    this._logger.log(
      JSON.stringify({
        userId: req['userId'],
        userAgent,
        token: bearerToken[1],
        ip: req.ip,
      }),
    );

    return next();
  }
}
