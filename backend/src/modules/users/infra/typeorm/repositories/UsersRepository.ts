import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });
    await this.repository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    await this.repository.save(user);
    return user;
  }

  public async findById(id: string | number): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let providers: User[] = [];

    if (except_user_id) {
      providers = await this.repository.find({
        where: {
          id: Not(except_user_id),
        },
        select: ['id', 'name', 'email', 'avatar', 'created_at', 'updated_at'],
      });
    } else {
      providers = await this.repository.find();
    }

    return providers;
  }

  public async remove(user: User): Promise<void> {
    await this.repository.delete(user);
  }
}

export default UsersRepository;
