import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  idUser: string;
  fileName: string;
}

class UpdateAvatarUserService {
  public async execute({ idUser, fileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(idUser);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      //remove file
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarExists = fs.existsSync(avatarFilePath);
      if (avatarExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = fileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;
