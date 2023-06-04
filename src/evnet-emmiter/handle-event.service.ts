import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT_NAME, ISendMailEvent } from './constants';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class HandleEventService {
  constructor(@InjectQueue('send-mail') private mailQueue: Queue) {}
  private readonly _logger = new Logger(HandleEventService.name);

  @OnEvent(EVENT_NAME.SEND_MAIL, { async: true })
  private async handleSendmail(payload: ISendMailEvent) {
    this._logger.log('mail Event', payload.emailReceiver);
    this.mailQueue.add(
      'send-mail',
      {
        emailReceiver: payload.emailReceiver,
        subject: 'Create New Account' + payload.subject,
        linkVerify: payload.linkVerify,
      },
      {
        priority: 1,
        delay: 1000,
        stackTraceLimit: 1000,
        timeout: 3000,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }
}
