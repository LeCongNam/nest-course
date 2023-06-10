import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/core/auth/auth.module';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SearchModule } from '../search/search.module';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [forwardRef(() => AuthModule), SearchModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
