import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/core/auth/auth.module';
import { SearchModule } from '../search/search.module';
import { RoleEntity } from './entity/role.entity';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    forwardRef(() => AuthModule),
    SearchModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
