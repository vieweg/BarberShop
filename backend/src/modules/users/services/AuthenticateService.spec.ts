import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateService from './AuthenticateService';
import BCriptHashProvider from '@modules/users/providers/HashProvider/implementations/BCriptHashProvider';

import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

let userRepository: FakeUserRepository;
let hashProvider: BCriptHashProvider;
let createUserService: CreateUserService;
let authenticateService: AuthenticateService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    hashProvider = new BCriptHashProvider();
    createUserService = new CreateUserService(userRepository, hashProvider);
    authenticateService = new AuthenticateService(userRepository, hashProvider);
  });

  it('Should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const authenticatedCredentials = await authenticateService.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(authenticatedCredentials).toHaveProperty('token');
    expect(authenticatedCredentials.user).toBe(user);
  });

  it('Should not be able authenticate with a non existing user', async () => {
    await expect(
      authenticateService.execute({
        email: 'jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate whit wrong password', async () => {
    await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateService.execute({
        email: 'jonhdoe@example.com',
        password: 'wrong-pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
