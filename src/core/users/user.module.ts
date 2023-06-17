import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/core/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SearchModule } from '../search/search.module';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { RoleEntity } from './entity/role.entity';

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
