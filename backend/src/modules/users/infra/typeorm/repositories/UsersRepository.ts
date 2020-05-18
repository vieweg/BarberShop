import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

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

  public async remove(user: User): Promise<void> {
    await this.repository.delete(user);
  }
}

export default UsersRepository;
