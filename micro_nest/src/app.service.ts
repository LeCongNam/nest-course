import { Injectable } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  @MessagePattern('notifications')
  public getNotifications(
    @Payload() data: number[],
    @Ctx() context: RmqContext,
  ) {
    console.log(`Pattern: ${context.getPattern()}`);
  }
}
