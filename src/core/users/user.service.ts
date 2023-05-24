import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterOptions } from 'src/shared/interface';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { FindOneUser } from './interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   *
   * @param { FindOneUser } user
   * @returns UserEntity or null if user is not found
   */
  async findOneUser(user: FindOneUser): Promise<UserEntity | null> {
    const listFilters = [];
    const listKey: any = Object.keys(user);

    for (const key of listKey) {
      if (user.hasOwnProperty(key)) {
        listFilters.push({ [key]: user[key] });
      }
    }
    // this query with or finder
    const data = await this.userRepository.findOne({
      where: listFilters,
    });

    return data;
  }

  async finAllUser(
    user: GetUserDto,
    filterOptions: filterOptions = {
      _skip: 10,
      _take: 0,
      _sort: 'ASC',
    },
  ): Promise<[UserEntity[], number]> {
    return this.userRepository.findAndCount({
      where: user,
      ...filterOptions,
    });
  }

  /**
   *
   * @param user UserDto
   * @returns Promise<[UserEntity[], number]> or throw an error
   *
   * @description User with Unique ID, email and username. Not accepted duplicate data
   */
  async saveUser(user: UserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.find({
      where: [
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
    return await this.userRepository.save(user);
  }

  async updateUser(user: UserDto): Promise<UserEntity> {
    const getUser = await this.userRepository.findOneBy({
      id: user.id,
    });
    if (getUser)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    await this.userRepository.update(
      {
        id: getUser.id,
      },
      getUser,
    );

    return getUser;
  }

  async deleteUser(user: GetUserDto): Promise<object> {
    const getUser = await this.userRepository.findOneBy({
      id: user.id,
    });
    if (!getUser)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    await this.userRepository.softDelete({
      id: getUser.id,
    });

    return {
      deleted: true,
      id: getUser.id,
    };
  }
}
