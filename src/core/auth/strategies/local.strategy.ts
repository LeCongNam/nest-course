import { Logger, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

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
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: configService.get<string>('PRIVATE_KEY'),
    //   signOptions: { expiresIn: '60s' },
    // });
    super();
  }

  private _logger = new Logger(LocalStrategy.name);

  public async validate(username: string, password: string) {
    const user = await this._authService.validateUsername(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
