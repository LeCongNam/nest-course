import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  Req,
  forwardRef,
} from '@nestjs/common';
import { filterOptions } from 'src/shared/interface';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { FindOneUser } from './interface';
import { AuthService } from '../auth/auth.service';
import { UsersDto } from './dto/getAll-user';
import { BaseMapping } from '../search/mapping/base.mapping';
import { SearchService } from '../search/service/search.service';
import { Provider } from '../search/constant';
import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
    @Inject(Provider.SearchService)
    private readonly _searchService: SearchService,
  ) {}
  private logger = new Logger(UserService.name);

  /**
   *
   * @param { FindOneUser } user
   * @returns UserEntity or null if user is not found
   */
  public async findOneUser(user: FindOneUser) {
    try {
      const data = await this.prisma.user.findFirst({
        where: {
          ...user,
        },
      });

      return data;
    } catch (error) {
      // console.log(error);
    }
  }

  public async findAllUser(
    user: UsersDto,
    filterOptions: filterOptions = {
      _skip: 10,
      _take: 0,
      _sort: 'asc',
    },
  ) {
    const users = await this.prisma.user.findMany({
      where: {
        AND: [user],
      },
      skip: +filterOptions._skip,
      take: +filterOptions._take,
      orderBy: {
        createdAt: filterOptions._sort,
      },
    });
    const total = await this.prisma.user.count();

    return {
      users,
      total,
    };
  }

  /**
   *
   * @param user UserDto
   * @returns Promise<[UserEntity[], number]> or throw an error
   *
   * @description User with Unique ID, email and username. Not accepted duplicate data
   */
  public async saveUser(user: UserDto) {
    const userExists = await this.prisma.user.findFirstOrThrow({
      where: {
        AND: [
          {
            username: user.username,
          },
          {
            email: user.email,
          },
        ],
      },
    });
    if (Number(userExists) !== 0) {
      throw new HttpException(
        `User with email ${user.email} or username ${user.username} already exists`,
        HttpStatus.CONFLICT,
      );
    }
    return await this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  public async updateUser(user: UserDto) {
    const getUser = await this.prisma.user.findFirstOrThrow({
      where: {
        id: user.id,
      },
    });
    if (getUser)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    await this.prisma.user.update({
      data: user,
      where: {
        id: getUser.id,
      },
    });

    return getUser;
  }

  public async deleteUser(user: UsersDto) {
    const getUser = await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    if (!getUser)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    const userDelete = await this.prisma.user.delete({
      where: {
        id: getUser.id,
      },
    });

    this.logger.warn('User Delete::', userDelete);

    return {
      deleted: true,
      id: getUser.id,
    };
  }

  public async searchUser(query: SearchRequest) {
    try {
      console.log('SV');

      return await this._searchService.searchQuery(query);
    } catch (error) {
      console.log(error);
    }
  }
}
