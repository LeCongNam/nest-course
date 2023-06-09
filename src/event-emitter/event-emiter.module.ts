import { Module } from '@nestjs/common';
import { HandleEventService } from './handle-event.service';
import { BullMailService } from 'src/core/bull/services/bull.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  providers: [HandleEventService, BullMailService],
  exports: [HandleEventService],
})
export class HandleEventEmitterModule {}
