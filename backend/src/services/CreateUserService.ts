import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userAlreadyExist = await userRepository.findOne({ where: { email } });

    if (userAlreadyExist) {
      throw new AppError('This email is already use.');
    }

    const encryptPass = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: encryptPass,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
