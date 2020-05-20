import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const { day, month, year } = req.body;
    const { provider_id } = req.params;
    const hoursInDayAvailable = await listProviderDayAvailabilityService.execute(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    return res.json(hoursInDayAvailable);
  }

  //public async show(req: Request, res: Response): Promise<Response> {}

  //public async create(req: Request, res: Response): Promise<Response> {}

  //public async update(req: Request, res: Response): Promise<Response> {}

  //public async delete(req: Request, res: Response): Promise<Response> {}
}
