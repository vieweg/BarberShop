import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  //public async index(req: Request, res: Response): Promise<Response> {}

  //public async show(req: Request, res: Response): Promise<Response> {}

  //public async create(req: Request, res: Response): Promise<Response> {}

  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarUserService);
    const user = await updateAvatar.execute({
      idUser: req.user.id,
      fileName: req.file.filename,
    });

    return res.json({ user: classToClass(user) });
  }

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
