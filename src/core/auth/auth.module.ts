import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HandleEventEmitterModule } from 'src/event-emitter/event-emiter.module';
import { SearchModule } from '../search/search.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    JwtModule,
    SearchModule,
    HandleEventEmitterModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '30 days' },
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
