import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  idUser: string;
}

@injectable()
class ShowProfileUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ idUser }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(idUser);

    if (!user) {
      throw new AppError('Only authenticated users can view the profile', 401);
    }

    return user;
  }
}

export default ShowProfileUserService;
