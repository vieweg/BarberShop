import AppError from '@shared/errors/AppError';

import UserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileUserService from '../services/ShowProfileUserService';

let userRepository: UserRepository;
let showProfileUserService: ShowProfileUserService;

describe('Show User Profile', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    showProfileUserService = new ShowProfileUserService(userRepository);
  });
  it('Should be able to show a profile user', async () => {
    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const showProfile = await showProfileUserService.execute({
      idUser: user.id,
    });

    expect(showProfile.name).toBe('Jonh Doe');
    expect(showProfile.email).toBe('jonhdoe@example.com');
  });

  it('Should not be able to show a profile for non-existing user', async () => {
    expect(
      showProfileUserService.execute({
        idUser: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
