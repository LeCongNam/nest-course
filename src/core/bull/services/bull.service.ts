import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Injectable()
@Processor('send-mail')
export class BullMailService {
  constructor(private mailerService: MailerService) {}
  private _logger = new Logger(BullMailService.name);

  @Process('send-mail')
  public async handleSendMail(
    job: Job<{ emailReceiver: string; linkVerify: string; subject: string }>,
  ) {
    try {
      await this.mailerService.sendMail({
        to: `${job.data.emailReceiver}`,
        from: 'namlem4u@gmail.com',
        subject: `${job.data.subject}`,
        context: {
          link_verify: job.data.linkVerify,
        },
        template: 'createEmail',
      });
      this._logger.log('Send mail Successfully');
    } catch (error) {
      this._logger.log(
        `Send mail create user to:[${job.data.emailReceiver}] ${error.message}`,
      );
    }

    return;
  }
}
