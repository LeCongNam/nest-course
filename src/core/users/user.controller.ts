import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'src/shared/res/custom-response';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Get('profile/:id')
  async profile(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getProfile(id);

    if (!user) throw new NotFoundException('User not Incorrect!');

    return {
      data: UserEntity.plainToClass(user),
    };
  }
}
