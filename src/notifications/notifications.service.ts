import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  public create(_createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  public findAll() {
    return `This action returns all notifications`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  public update(id: number, _updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  public remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
