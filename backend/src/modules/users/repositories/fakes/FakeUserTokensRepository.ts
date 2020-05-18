import { uuid } from 'uuidv4';

import IUserTokenRepository from '../IUserTokenRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';

export default class FakeUserTokensRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  async generate(id_user: string): Promise<UserToken> {
    const token = new UserToken();
    Object.assign(token, {
      id: uuid(),
      id_user,
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokens.push(token);

    return token;
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = this.tokens.find(findToken => findToken.token === token);

    return findToken;
  }
}
