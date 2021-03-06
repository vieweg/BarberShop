import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  idUser: string;
  fileName: string;
}

@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ idUser, fileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(idUser);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      //remove file
      await this.storageProvider.deleteFile(user.avatar);
    }

    const savedFile = await this.storageProvider.saveFile(fileName);

    user.avatar = savedFile;

    await this.userRepository.save(user);
    return classToClass(user);
  }
}

export default UpdateAvatarUserService;
