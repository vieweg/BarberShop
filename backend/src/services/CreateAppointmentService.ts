import { startOfHour } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';

interface request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: request) {
    const dateAppontment = startOfHour(date);

    if (this.appointmentsRepository.findByDate(dateAppontment)) {
      throw Error('This appointment is already booked.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: dateAppontment,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
