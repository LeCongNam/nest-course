import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { UserDto } from 'src/core/users/dto/user.dto';
import { IsPublic } from 'src/shared/decorator';
import { BaseController } from 'src/shared/res/custom-response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guard/local-authl.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(
    @Body() userDto: any,
    @Res() res: Response,
    @Req() req: any,
  ) {
    console.log('Controller', req.user);

    const { data, token } = await this._authService.loginWithEmail(userDto);
    const serilize = new UserDto(data);
    return this.customResponse(res, {
      serilize,
      // data,
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
