import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/core/auth/dto/login.dto';
import { BaseRepository } from 'src/shared/repository/base.repository';
import { DataSource } from 'typeorm';
import { Role } from '../constant';
import { AllUser } from '../dto/getAll-user';
import { UpdateUser } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { FindOneUser } from '../interface';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }

  public async getUserById(id: string) {
    return this.findOne({
      where: { id },
    });
  }

  public async getUser(user: FindOneUser = {}) {
    return this.findOne({
      where: user,
    });
  }

  public async getUserByEmail(user: LoginDto) {
    return this.findOne({
      where: {
        email: user.email,
      },
    });
  }

  public async getUserByUserNameOrEmail(userData: {
    userName: string;
    email: string;
  }) {
    return this.find({
      where: [{ userName: userData.userName }, { email: userData.email }],
    });
  }

  public async createUser(user: UserDto) {
    return this.create({
      ...user,
      role: {
        id: Role.MEMBER,
      },
    });
  }

  public async getAllUser(user: AllUser) {
    return this.findAndCount({
      where: user,
    });
  }

  public async updateUser(id: string, user: UpdateUser) {
    return this.update({ id }, user);
  }
}
