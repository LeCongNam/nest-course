import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import * as fs from 'fs';
import { join } from 'path';
import * as readline from 'readline';

import { IsPublic } from 'src/shared/decorator';
import { UserDto } from 'src/core/users/dto/user.dto';
import { AuthService } from './auth.service';
import { BaseController } from 'src/shared/res/custom-response';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/core/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  @IsPublic()
  async register(@Body() user: UserDto, @Res() res: Response) {
    const newUser = plainToClass(
      UserEntity,
      await this.authService.registerAccount(user),
    );
    return this.customResponse(res, newUser);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  @IsPublic()
  async login(@Body() userDto: LoginDto, @Res() res: Response) {
    const { data, token } = await this.authService.loginWithEmail(userDto);

    return this.customResponse(res, {
      ...(data && UserEntity.plainToClass(data)),
      token,
    });
  }
}
