import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import BCriptHashProvider from '@modules/users/providers/HashProvider/implementations/BCriptHashProvider';
import AppError from '@shared/errors/AppError';

let userRepository: FakeUserRepository;
let hashProvider: BCriptHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    hashProvider = new BCriptHashProvider();
    createUserService = new CreateUserService(userRepository, hashProvider);
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

  it('Should be able encript the password for user', async () => {
    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(await hashProvider.compareHash('123456', user.password)).toBe(true);
  });
});
