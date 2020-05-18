import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
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
      console.log(account);
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = {
      from: 'Go Barber <no-reply@gobarber.com>',
      to,
      subject: 'Pedido de recuperação de senha',
      text: body,
      html: body,
    };

    const response = await this.client.sendMail(message);

    console.log(response.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
  }
}
