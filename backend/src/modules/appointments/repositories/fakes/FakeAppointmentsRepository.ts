import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findById(id: string | number): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.id === id,
    );

    return findAppointment;
  }

  public async findAll(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async delete(appointment: Appointment): Promise<void> {
    const indexAppointment = this.appointments.findIndex(
      app => app.id === appointment.id,
    );
    this.appointments.slice(indexAppointment, 1);
  }
}
