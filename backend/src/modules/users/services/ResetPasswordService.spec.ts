//import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('Reset Password Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jonh.doe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const newPassword = '789123';

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: newPassword,
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    if (updatedUser) {
      const compareHash = await fakeHashProvider.compareHash(
        newPassword,
        updatedUser.password,
      );
      expect(compareHash).toBe(true);
    }

    expect(generateHash).toHaveBeenCalledWith(newPassword);
  });

  it('Should not be able reset password with no-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able reset password with no-existing user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jonh.doe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await fakeUserRepository.remove(user);

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able reset password with token expired', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jonh.doe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
