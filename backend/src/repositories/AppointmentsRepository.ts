import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface AppointmentCreateDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public listAll(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: AppointmentCreateDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const appointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return appointment || null;
  }
}

export default AppointmentsRepository;
