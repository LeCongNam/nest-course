import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { BaseController } from 'src/shared/res/custom-response';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from './constant';
import { Roles } from './decorator';
import { UsersDto } from './dto/getAll-user';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly _useService: UserService) {
    super();
  }

  @Get('profile/:id')
  @Roles(Role.MEMBER, Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  public async getProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const user = await this._useService.findOneUser({ id });
    if (user) {
      const userTransForm = UserDto.plainToClass(user);
      return this.customResponse(res, userTransForm);
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
  @Roles(Role.ADMIN) // yeu cau la admin => ddang test
  @UseGuards(AuthGuard, RoleGuard)
  public async getAlluser(@Res() res: Response, @Query() query: UsersDto) {
    const { _skip, _sort, _take, ...user } = query;

    const [users, pagination] = await this._useService.findAllUser(
      user as UsersDto,
      {
        _skip,
        _take,
        _sort: _sort && JSON.parse(_sort),
      },
    );

    if (users?.length > 0) {
      const userTransForm = plainToClass(UserDto, users);
      return this.customResponse(res, userTransForm, {
        ...pagination,
        page: +query._skip,
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
    try {
      const data = await this._useService.searchUser(query);
      return this.customResponse(res, data);
    } catch (error) {
      // console.log(error);
    }
  }
}
