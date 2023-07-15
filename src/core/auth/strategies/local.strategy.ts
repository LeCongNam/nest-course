import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private _authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '60s' },
    });
  }

  public async validate(payload: LoginDto) {
    const user = await this._authService.validateUser(
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
