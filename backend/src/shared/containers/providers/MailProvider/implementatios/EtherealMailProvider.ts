import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';
import IMailProviderDTO from '../dtos/IMailProviderDTO';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: IMailProviderDTO): Promise<void> {
    const response = await this.client.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || 'ShopBarber',
        address: from?.email || 'contato@shopbarber.com.br',
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log(response.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
  }
}
