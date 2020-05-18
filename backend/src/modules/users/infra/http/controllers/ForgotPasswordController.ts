import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordMail from '@modules/users/services/SendForgotPasswordMail';

export default class UsersController {
  //public async index(req: Request, res: Response): Promise<Response> {}

  //public async show(req: Request, res: Response): Promise<Response> {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswordMail = container.resolve(SendForgotPasswordMail);

    await sendForgotPasswordMail.execute({
      email,
      body: 'Email de recuperação de senha',
    });

    return res.status(201).send();
  }

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
