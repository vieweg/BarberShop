import { startOfHour, isBefore, isWithinInterval, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const dateAppontment = startOfHour(date);
    const currentDate = Date.now();

    if (provider_id === user_id) {
      throw new AppError('You cannot schedule an appointment with yourself');
    }

    if (isBefore(dateAppontment, currentDate)) {
      throw new AppError('You cannot schedule a time that has passed');
    }

    if (getHours(dateAppontment) < 8 || getHours(dateAppontment) > 17) {
      throw new AppError(
        'It is not possible to schedule a time outside of business hours',
      );
    }

    if (await this.appointmentsRepository.findByDate(dateAppontment)) {
      throw new AppError('This schedule is already scheduled');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: dateAppontment,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
