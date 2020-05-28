import { injectable, inject } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMail {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const token = await this.userTokenRepository.generate(user.id);
    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Solicitação de recuperação de senha',
      templateData: {
        file: templateFile,
        variables: {
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token.token}`,
          name: user.name,
        },
      },
    });
  }
}

export default SendForgotPasswordMail;
