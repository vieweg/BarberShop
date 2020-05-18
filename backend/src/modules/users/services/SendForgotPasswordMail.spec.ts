import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/containers/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordMail from './SendForgotPasswordMail';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

let sendForgotPasswordMail: SendForgotPasswordMail;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordMail = new SendForgotPasswordMail(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Should be able send mail whit recorvery password instructions', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jonh.doe@example.com',
      password: '123456',
    });

    await sendForgotPasswordMail.execute({
      email: 'jonh.doe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able recorvey password a non-existing user', async () => {
    await expect(
      sendForgotPasswordMail.execute({
        email: 'jonh.doe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able generate a token for user on recovery process', async () => {
    const generatedToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jonh.doe@example.com',
      password: '123456',
    });

    await sendForgotPasswordMail.execute({
      email: 'jonh.doe@example.com',
    });

    expect(generatedToken).toHaveBeenCalledWith(user.id);
  });
});
