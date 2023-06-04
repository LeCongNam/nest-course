import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private _logger = new Logger(AppController.name);

  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string): string {
    this._logger.log(`greeting running`);
    return `Hello ${name}`;
  }

  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    this._logger.log(`reeting-async running`);

    return `Hello ${name} Async`;
  }

  @EventPattern('book-created')
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    this._logger.log(`reeting-async running`, data);
  }
}
