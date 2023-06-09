import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UsersDto } from '../dto/getAll-user';
import { UserDto } from '../dto/user.dto';
import { FindOneUser } from '../interface';
import { filterOptions } from 'src/shared/interface';

export class UserEntity {
  constructor(private prisma: PrismaService) {}
  private readonly _logger = new Logger(UserEntity.name);

  /**
   *
   * @param { FindOneUser } user
   * @returns UserEntity or null if user is not found
   */
  public async findOneUser(user: FindOneUser): Promise<User | null> {
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

    this._logger.warn('User Delete::', userDelete);

    return {
      deleted: true,
      id: getUser.id,
    };
  }
}
