import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/containers/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  idUser: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ idUser }: IRequest): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(
      `providers-list:${idUser}`,
    );
    if (!providers) {
      providers = await this.userRepository.findAllProviders({
        except_user_id: idUser,
      });

      await this.cacheProvider.save(`providers-list:${idUser}`, providers);
    }

    return classToClass(providers);
  }
}

export default ListProvidersService;
