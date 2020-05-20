import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '../../../repositories/INotificationsRepository';
import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private repository: MongoRepository<Notification>;

  constructor() {
    this.repository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notifications = this.repository.create({ content, recipient_id });
    await this.repository.save(notifications);
    return notifications;
  }
}

export default NotificationsRepository;
