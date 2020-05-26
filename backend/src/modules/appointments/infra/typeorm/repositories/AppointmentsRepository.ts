import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllMonthProviderDTO from '@modules/appointments/dtos/IFindAllMonthProviderDTO';
import IFindAllDayProviderDTO from '@modules/appointments/dtos/IFindAllDayProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async create({
    user_id,
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.repository.create({ provider_id, user_id, date });
    await this.repository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.repository.findOne({ where: { date } });

    return appointment;
  }

  public async findByDateAndProvider({
    date,
    provider_id,
  }: {
    date: Date;
    provider_id: string;
  }): Promise<Appointment | undefined> {
    const appointment = await this.repository.findOne({
      where: { date, provider_id },
    });

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

  public async findAllMonthProvider({
    provider_id,
    month,
    year,
  }: IFindAllMonthProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.repository.find({
      where: {
        provider_id,
        date: Raw(
          fieldDate =>
            `to_char(${fieldDate}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllDayProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllDayProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.repository.find({
      where: {
        provider_id,
        date: Raw(
          fieldDate =>
            `to_char(${fieldDate}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }

  public async delete(appointment: Appointment): Promise<void> {
    await this.repository.delete(appointment);
  }
}

export default AppointmentsRepository;
