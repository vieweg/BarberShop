import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  //public async index(req: Request, res: Response): Promise<Response> {}

  //public async show(req: Request, res: Response): Promise<Response> {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });

    return res.json(user);
  }

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
