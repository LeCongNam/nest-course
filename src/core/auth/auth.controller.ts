import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserDto } from 'src/core/users/dto/user.dto';
import { IsPublic } from 'src/shared/decorator';
import { BaseController } from 'src/shared/res/custom-response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from './strategies/local.strategy';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  @IsPublic()
  @Post('/register')
  public async register(@Body() user: UserDto, @Res() res: Response) {
    const userCreated = await this._authService.registerAccount(user);
    return this.customResponse(res, userCreated);
  }

  @IsPublic()
  @Post('/login')
  @IsPublic()
  public async login(@Body() userDto: LoginDto, @Res() res: Response) {
    const { data, token } = await this._authService.loginWithEmail(userDto);
    return this.customResponse(res, {
      data,
      token,
    });
  }

  @UseGuards(LocalStrategy)
  @Post('login-passport')
  public async loginStrategy(@Res() res: Response, @Body() userDto: LoginDto) {
    const user = await this._authService.loginWithEmail(userDto);
    return this.customResponse(res, user);
  }
}
