import UserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';
import { classToClass } from 'class-transformer';

let userRepository: UserRepository;
let listProvidersService: ListProvidersService;
let cacheProvider: FakeCacheProvider;

describe('List providers', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    cacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      userRepository,
      cacheProvider,
    );
  });
  it('Should be able to list all providers, except current user', async () => {
    const loggedUser = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const user2 = await userRepository.create({
      name: 'Jonh Tre',
      email: 'jonhtre@example.com',
      password: '123456',
    });

    const user3 = await userRepository.create({
      name: 'Jonh Qua',
      email: 'jonhqua@example.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      idUser: loggedUser.id,
    });

    expect(providers).toEqual([classToClass(user2), classToClass(user3)]);
  });
});
