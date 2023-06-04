import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const isPublic = this.reflector.get('IS_PUBLIC', context.getHandler());

    if (isPublic) {
      return true;
    }

    const tokenBearer: string | undefined = req.headers.authorization;
    if (!tokenBearer) {
      return false;
    }

    const token = tokenBearer.split(' ')[1];
    const tokenDecode = this.jwtService.decode(token);
    if (!tokenDecode) {
      return false;
    }

    req.user = tokenDecode;

    return true;
  }
}
