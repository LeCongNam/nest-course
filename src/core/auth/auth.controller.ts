import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/core/users/dto/user.dto';
import { IsPublic } from 'src/shared/decorator';
import { BaseController } from 'src/shared/res/custom-response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserRegisterDto } from '../users/dto/user-register.dto';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @IsPublic()
  @Post('/register')
  @UsePipes(new ValidationPipe())
  public async register(@Body() user: UserRegisterDto, @Res() res: Response) {
    const userCreated = await this.authService.registerAccount(user);
    const newUser = UserDto.plainToClass(userCreated);
    return this.customResponse(res, newUser);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  @IsPublic()
  public async login(@Body() userDto: LoginDto, @Res() res: Response) {
    const { data, token } = await this.authService.loginWithEmail(userDto);

    return this.customResponse(res, {
      ...(data && UserDto.plainToClass(data)),
      token,
    });
  }
}
