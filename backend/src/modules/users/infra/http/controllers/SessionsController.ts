import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateService from '@modules/users/services/AuthenticateService';

export default class UsersController {
  //public async index(req: Request, res: Response): Promise<Response> {}

  //public async show(req: Request, res: Response): Promise<Response> {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateService = container.resolve(AuthenticateService);

    const { user, token } = await authenticateService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
