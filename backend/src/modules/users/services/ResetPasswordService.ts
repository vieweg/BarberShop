import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token not found', 401);
    }

    if (differenceInHours(Date.now(), userToken.created_at) > 2) {
      throw new AppError('Token is expired', 401);
    }

    const user = await this.userRepository.findById(userToken.id_user);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
