import { getRepository, Repository } from 'typeorm';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async generate(id_user: string): Promise<UserToken> {
    const userToken = this.repository.create({ id_user });
    await this.repository.save(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({ where: { token } });
    return userToken;
  }
}

export default UserTokenRepository;
