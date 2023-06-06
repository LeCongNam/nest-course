import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/core/users/user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _userService: UserService) {
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
