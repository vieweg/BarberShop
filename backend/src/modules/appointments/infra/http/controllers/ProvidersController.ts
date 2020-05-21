import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      idUser: req.user.id,
    });

    return res.json({ providers: classToClass(providers) });
  }

  //public async show(req: Request, res: Response): Promise<Response> {}

  //public async create(req: Request, res: Response): Promise<Response> {}

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
