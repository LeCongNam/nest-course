import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/core/auth/auth.module';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [forwardRef(() => AuthModule), SearchModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService],
  exports: [UserService],
})
export class UserModule {}
