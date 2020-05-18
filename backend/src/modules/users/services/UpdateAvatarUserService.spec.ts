import UserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateAvatarUserService from './UpdateAvatarUserService';

import StorageProvider from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

let userRepository: UserRepository;
let storageProvider: StorageProvider;
let updateAvatar: UpdateAvatarUserService;

describe('Update User Avatar', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    storageProvider = new StorageProvider();
    updateAvatar = new UpdateAvatarUserService(userRepository, storageProvider);
  });
  it('Should be able to update a avatar user', async () => {
    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const avatarFile = 'caminho/para/o/avatar.jpg';

    await updateAvatar.execute({ idUser: user.id, fileName: avatarFile });

    expect(user.avatar).toBe(avatarFile);
  });

  it('Should not be able change avatar when not authenticated', async () => {
    const avatarFile = 'caminho/para/o/avatar.jpg';

    await expect(
      updateAvatar.execute({
        idUser: 'user-not-authenticaded',
        fileName: avatarFile,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able remove old avatar when a new has submited', async () => {
    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');

    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const avatarFile = 'caminho/para/o/avatar.jpg';
    const otherAvatarFile = 'caminho/para/outro/avatar.jpg';

    await updateAvatar.execute({ idUser: user.id, fileName: avatarFile });
    await updateAvatar.execute({ idUser: user.id, fileName: otherAvatarFile });

    expect(deleteFile).toBeCalledWith(avatarFile);
    expect(user.avatar).toBe(otherAvatarFile);
  });
});
