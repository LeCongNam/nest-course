import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { BaseController } from 'src/shared/res/custom-response';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from './constant';
import { Roles } from './decorator';
import { AllUser } from './dto/getAll-user';
import { UpdateUser } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly _useService: UserService) {
    super();
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('profile/:id')
  @Roles(Role.MEMBER, Role.ADMIN)
  public async getProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const user = await this._useService.findOneUserById(id);
    if (user) {
      // const userTransForm = UserDto.plainToClass(user);
      return this.customResponse(res, user);
    }
    return this.customResponse(
      res,
      {},
      {
        message: 'user Not Found',
        code: 404,
      },
    );
  }

  @Get('/all')
  // @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  public async getAlluser(@Res() res: Response, @Query() query: AllUser) {
    const { _skip, _sort, _take, ...user } = query;

    const [users, total] = await this._useService.findAllUser(user);

    if (users?.length > 0) {
      const userTransForm = plainToClass(UserDto, users);
      return this.customResponse(res, userTransForm, {
        page: +query._skip,
        total: total,
      });
    }

    return this.customResponse(res, [], {
      message: 'user Not Found',
      code: 404,
    });
  }

  @Get('search')
  @Roles(Role.ADMIN)
  public async search(@Res() res: Response, @Query() query: SearchRequest) {
    const data = await this._useService.searchUser(query);
    return this.customResponse(res, data);
  }

  @Put('profile/:id')
  public async updateProfile(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUser,
  ) {
    const data = await this._useService.updateUser(id, user);

    return this.customResponse(res, data);
  }
}
