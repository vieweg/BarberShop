import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  idUser: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ idUser }: IRequest): Promise<User[]> {
    const providers = await this.userRepository.findAllProviders({
      except_user_id: idUser,
    });

    return providers;
  }
}

export default ListProvidersService;
