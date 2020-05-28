import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import BCriptHashProvider from '@modules/users/providers/HashProvider/implementations/BCriptHashProvider';
import FakeCacheProvider from '@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

let userRepository: FakeUserRepository;
let hashProvider: BCriptHashProvider;
let createUserService: CreateUserService;
let cacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    hashProvider = new BCriptHashProvider();
    cacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      userRepository,
      hashProvider,
      cacheProvider,
    );
  });
  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with email alrealy existing', async () => {
    await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
