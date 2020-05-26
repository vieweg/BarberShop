import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;
    const provider_id = req.user.id;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );
    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(appointments);
  }

  //public async show(req: Request, res: Response): Promise<Response> {}

  //public async create(req: Request, res: Response): Promise<Response> {}

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
