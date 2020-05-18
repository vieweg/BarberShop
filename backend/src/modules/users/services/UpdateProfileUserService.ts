import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  idUser: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    idUser,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(idUser);

    if (!user) {
      throw new AppError('Only authenticated users can change Profile', 401);
    }

    if (user.email !== email) {
      const checkExistingMail = await this.userRepository.findByEmail(email);
      if (checkExistingMail) {
        throw new AppError('This e-mail already in use');
      }
    }

    user.name = name;
    user.email = email;

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError('This old password typing is wrong');
      }
      user.password = await this.hashProvider.generateHash(password);
    } else if (old_password || password) {
      throw new AppError('You need pass old and new password for change then');
    }

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileUserService;
