import AppError from '@shared/errors/AppError';

import UserRepository from '../repositories/fakes/FakeUsersRepository';
import HashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileUserService from './UpdateProfileUserService';

let userRepository: UserRepository;
let hashProvider: HashProvider;
let updateProfileUserService: UpdateProfileUserService;

describe('Update User Profile', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    hashProvider = new HashProvider();
    updateProfileUserService = new UpdateProfileUserService(
      userRepository,
      hashProvider,
    );
  });
  it('Should be able to update a profile user', async () => {
    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await updateProfileUserService.execute({
      idUser: user.id,
      name: 'Jonh Foe',
      email: 'jonhfoe@example.com',
      old_password: '123456',
      password: '987654',
    });

    expect(user.name).toBe('Jonh Foe');
    expect(user.email).toBe('jonhfoe@example.com');
    expect(await hashProvider.compareHash('987654', user.password)).toBe(true);
  });

  it('Should not be able to update a profile without a authenticated user', async () => {
    await expect(
      updateProfileUserService.execute({
        idUser: '',
        name: 'Jonh Foe',
        email: 'jonhfoe@example.com',
        old_password: '123456',
        password: '987654',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change email to another user email', async () => {
    await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const user = await userRepository.create({
      name: 'Jonh Doe 2',
      email: 'jonhdoe2@example.com',
      password: '123456',
    });

    await expect(
      updateProfileUserService.execute({
        idUser: user.id,
        name: 'Jonh Doe 2',
        email: 'jonhdoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a profile without a old-password when a password as send', async () => {
    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileUserService.execute({
        idUser: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        password: '456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a profile without a new-password when old_password as send', async () => {
    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileUserService.execute({
        idUser: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a profile with a wrong old-password', async () => {
    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileUserService.execute({
        idUser: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        password: '456789',
        old_password: 'wrong-pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
