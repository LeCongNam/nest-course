import { Controller, Get } from '@nestjs/common';
import { HandleMessageService } from './services/handle-mesage.service';

@Controller('micro')
export class MicroServiceController {
  constructor(private readonly _microService: HandleMessageService) {}

  @Get('/greeting')
  public async getHello() {
    return this._microService.getHello();
  }

  @Get('/greeting-async')
  public async getHelloAsync() {
    return this._microService.getHelloAsync();
  }

  @Get('/publish-event')
  public async publishEvent() {
    this._microService.publishEvent();
  }
}
