import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const roles = this.reflector.get<number[]>('roles', context.getHandler());

    if (!roles && roles?.length === 0) {
      return false;
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

    return this.matchRoles(roles, tokenDecode['roleId']);
  }

  private matchRoles(roles: number[], userRoles: number): boolean {
    let result = false;

    roles.forEach((role: number) => {
      if (role === userRoles) {
        result = true;
      }
    });
    return result;
  }
}
