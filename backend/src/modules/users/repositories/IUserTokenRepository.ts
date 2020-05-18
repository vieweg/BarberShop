import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generate(id_user: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
