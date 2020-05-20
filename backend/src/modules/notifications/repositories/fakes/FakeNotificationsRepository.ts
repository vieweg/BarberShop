import { ObjectID } from 'mongodb';

import INotificationsRepository from '../../repositories/INotificationsRepository';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
