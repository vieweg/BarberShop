import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
  body?: string;
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

  public async execute({ email, body = '' }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const token = await this.userTokenRepository.generate(user.id);
    const bodyFormated = `Seu token para recuperar a senha é: ${token.token}`;

    await this.mailProvider.sendMail(email, bodyFormated);
  }
}

export default SendForgotPasswordMail;
