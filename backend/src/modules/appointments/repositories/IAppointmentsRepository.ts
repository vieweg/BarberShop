import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
  findById(id: string | number): Promise<Appointment | undefined>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  delete(appointment: Appointment): Promise<void>;
}
