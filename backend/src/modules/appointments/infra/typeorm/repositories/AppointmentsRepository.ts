import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.repository.create({ provider_id, date });
    await this.repository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.repository.findOne({ where: { date } });

    return appointment;
  }

  public async findById(id: string | number): Promise<Appointment | undefined> {
    const appointment = await this.repository.findOne(id);

    return appointment;
  }

  public async findAll(): Promise<Appointment[]> {
    const appointments = await this.repository.find();

    return appointments;
  }

  public async delete(appointment: Appointment): Promise<void> {
    await this.repository.delete(appointment);
  }
}

export default AppointmentsRepository;
