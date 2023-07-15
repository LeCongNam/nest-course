import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { Provider } from '../search/constant';
import { SearchService } from '../search/service/search.service';
import { AllUser } from './dto/getAll-user';
import { UpdateUser } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
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
    return this._userRepository.getUser(user);
  }

  public async findOneUserById(id: string) {
    return this._userRepository.getUserById(id);
  }

  public async login(user: LoginDto) {
    return this._userRepository.getUserByEmail(user);
  }

  public async findOneUserOption(user: UserDto) {
    return this._userRepository.getUser(user);
  }

  public async findAllUser(user: AllUser) {
    const users = await this._userRepository.getAllUser(user);
    return users;
  }

  /**
   *
   * @param user UserDto
   * @returns Promise<[UserEntity[], number]> or throw an error
   *
   * @description User with Unique ID, email and username. Not accepted duplicate data
   */
  public async saveUser(user: UserEntity) {
    return this._userRepository.createUser(user);
  }

  public async updateUser(id: string, user: UpdateUser) {
    const getUser = await this._userRepository.getUserById(id);

    if (getUser === null)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    // await this._userRepository.updateUser(id, user);
    return this._userRepository.getUserById(id);
  }

  public async deleteUser(user: UserDto) {
    // const getUser = await this._userRepository.delete({
    //   where: {
    //     id: user.id,
    //   },
    // });
    // if (!getUser)
    //   throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    // const userDelete = await this._userRepository.delete({
    //   where: {
    //     id: getUser.id,
    //   },
    // });
    // this.logger.warn('User Delete::', userDelete);
    // return {
    //   deleted: true,
    //   id: getUser.id,
    // };
  }

  public async searchUser(query: SearchRequest) {
    // try {
    //   console.log('SV');
    //   return await this._searchService.searchQuery(query);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
