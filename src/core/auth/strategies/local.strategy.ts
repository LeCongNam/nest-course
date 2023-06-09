import { Inject, Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/core/users/user.service';
import { LoginDto } from '../dto/login.dto';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY,
    });
  }

  public async validate(payload: LoginDto) {
    const user = await this._userService.findOneUser({
      email: payload.email,
    });
    if (!user) return false;

    if (user?.password !== payload.password) {
      return false;
    }

    return user;
  }
}
