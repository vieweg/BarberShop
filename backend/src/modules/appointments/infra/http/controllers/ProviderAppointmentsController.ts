import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;
    const provider_id = req.user.id;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );
    const response = await listProviderAppointmentsService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(response);
  }

  //public async show(req: Request, res: Response): Promise<Response> {}

  //public async create(req: Request, res: Response): Promise<Response> {}

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
