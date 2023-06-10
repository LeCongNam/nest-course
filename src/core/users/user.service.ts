import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { filterOptions } from 'src/shared/interface';
import { AuthService } from '../auth/auth.service';
import { Provider } from '../search/constant';
import { SearchService } from '../search/service/search.service';
import { UsersDto } from './dto/getAll-user';
import { UserDto } from './dto/user.dto';
import { FindOneUser } from './interface';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private _userRepository: UserRepository,
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
      const data = await this._userRepository.getOne({
        ...user,
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
      _sort: {
        createdAt: 'desc',
      },
    },
  ) {
    console.log(filterOptions._sort);

    const users = await this._userRepository.getList({
      AND: [user],
      ...filterOptions,
    });

    return users;
  }

  /**
   *
   * @param user UserDto
   * @returns Promise<[UserEntity[], number]> or throw an error
   *
   * @description User with Unique ID, email and username. Not accepted duplicate data
   */
  public async saveUser(user: UserDto) {
    const userExists = await this._userRepository.getOne({
      AND: [
        {
          username: user.username,
        },
        {
          email: user.email,
        },
      ],
    });
    if (Number(userExists) !== 0) {
      throw new HttpException(
        `User with email ${user.email} or username ${user.username} already exists`,
        HttpStatus.CONFLICT,
      );
    }
    return await this._userRepository.create({
      data: {
        ...user,
      },
    });
  }

  public async updateUser(user: UserDto) {
    const getUser = await this._userRepository.getOne({
      id: user.id,
    });
    if (getUser)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    await this._userRepository.update(user.id, user);

    return getUser;
  }

  public async deleteUser(user: UsersDto) {
    const getUser = await this._userRepository.delete({
      where: {
        id: user.id,
      },
    });
    if (!getUser)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    const userDelete = await this._userRepository.delete({
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
