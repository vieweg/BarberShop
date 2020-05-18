import IMailProvider from '../models/IMailProvider';
import IMailProviderDTO from '../dtos/IMailProviderDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: IMailProviderDTO[] = [];

  public async sendMail(message: IMailProviderDTO): Promise<void> {
    this.messages.push(message);
  }
}
