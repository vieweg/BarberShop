import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class UsersController {
  //public async index(req: Request, res: Response): Promise<Response> {}

  //public async show(req: Request, res: Response): Promise<Response> {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;
    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      password,
      token,
    });

    return res.status(201).send();
  }

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
