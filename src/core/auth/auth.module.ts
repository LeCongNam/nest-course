import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HandleEventEmitterModule } from 'src/event-emitter/event-emiter.module';
import { SearchModule } from '../search/search.module';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule,
    SearchModule,
    HandleEventEmitterModule,
    JwtModule.register({
      // global: true,
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '30 days' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
