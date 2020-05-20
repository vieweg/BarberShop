import UserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let userRepository: UserRepository;
let listProvidersService: ListProvidersService;

describe('List providers', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    listProvidersService = new ListProvidersService(userRepository);
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

    expect(providers).toEqual([user2, user3]);
  });
});
