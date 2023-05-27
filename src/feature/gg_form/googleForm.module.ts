import { Module } from '@nestjs/common';
import { GoogleFormController } from './GoogleForm.controller';

@Module({
  controllers: [GoogleFormController],
  providers: [],
})
export class GoogleFormModule {}
