import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullMailService } from './services/bull.service';

@Module({
  providers: [BullMailService],
  exports: [BullMailService],
})
export class BullQueueModule {}
