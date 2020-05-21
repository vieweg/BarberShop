import { Request, Response, response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileUserService from '@modules/users/services/UpdateProfileUserService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  //public async index(req: Request, res: Response): Promise<Response> {}

  public async show(req: Request, res: Response): Promise<Response> {
    const showProfileUserService = container.resolve(ShowProfileUserService);
    const profile = await showProfileUserService.execute({
      idUser: req.user.id,
    });

    return res.json({ profile: classToClass(profile) });
  }

  //public async create(req: Request, res: Response): Promise<Response> {}

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, old_password, password } = req.body;

    const updateProfileService = container.resolve(UpdateProfileUserService);
    const user = await updateProfileService.execute({
      idUser: req.user.id,
      name,
      email,
      old_password,
      password,
    });

    return res.json({ user: classToClass(user) });
  }

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
