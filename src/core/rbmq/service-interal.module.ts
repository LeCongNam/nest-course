import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule, HttpService } from '@nestjs/axios';
import { HandleMessageService } from './services/handle-mesage.service';
import { MicroServiceController } from './rbmq.controller';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GREETING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [HandleMessageService],
  controllers: [MicroServiceController],
})
export class InternalModule {}
