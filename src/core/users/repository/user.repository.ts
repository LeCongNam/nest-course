import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/core/auth/dto/login.dto';
import { BaseRepository } from 'src/shared/repository/base.repository';
import { DataSource } from 'typeorm';
import { Role } from '../constant';
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

  public async createUser(user: UserEntity) {
    console.log('save::', user);

    return this.save({
      ...user,
      roleId: Role.MEMBER,
    });
  }

  public async getAllUser(user: any) {
    return this.findAndCount({
      where: user,
    });
  }

  public async updateUser(id: string, user: Partial<UserEntity>) {
    return this.update({ id }, user);
  }
}
