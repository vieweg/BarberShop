import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();
    const response = await appointmentsRepository.findAll();

    return res.json(response);
  }

  //public async show(req: Request, res: Response): Promise<Response> {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const user_id = req.user.id;
    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );
    const appointment = await createAppointmentService.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }

  //public async update(req: Request, res: Response): Promise<Response> {}

  public async delete(req: Request, res: Response): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();
    const { id } = req.params;
    const appointment = await appointmentsRepository.findById(id);

    if (appointment) {
      await appointmentsRepository.delete(appointment);
      return res.status(200).send();
    }
    return res.status(404).send();
  }
}
