import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/core/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BullMailService } from './queue/bull.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, BullMailService],
  exports: [AuthService],
})
export class AuthModule {}
