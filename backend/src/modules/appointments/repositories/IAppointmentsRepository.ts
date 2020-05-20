import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllMonthProviderDTO from '../dtos/IFindAllMonthProviderDTO';
import IFindAllDayProviderDTO from '../dtos/IFindAllDayProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
  findById(id: string | number): Promise<Appointment | undefined>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByDateAndProvider(data: {
    date: Date;
    provider_id: string;
  }): Promise<Appointment | undefined>;
  findAllMonthProvider(data: IFindAllMonthProviderDTO): Promise<Appointment[]>;
  findAllDayProvider(data: IFindAllDayProviderDTO): Promise<Appointment[]>;
  delete(appointment: Appointment): Promise<void>;
}
