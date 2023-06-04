import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BullMailService } from '../bull/services/bull.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BullModule } from '@nestjs/bull';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from '../search/search.module';
import { HandleEventEmitterModule } from 'src/evnet-emmiter/event-emiter.module';

@Module({
  imports: [JwtModule, SearchModule, HandleEventEmitterModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
