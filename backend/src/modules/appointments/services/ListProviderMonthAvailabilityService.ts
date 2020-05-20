import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter, isBefore } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllMonthProvider(
      {
        provider_id,
        month,
        year,
      },
    );
    const currentDate = new Date(Date.now());

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayFromMonth = [];

    for (let key = 1; key <= daysInMonth; key++) {
      eachDayFromMonth.push(key);
    }

    const monthAvailability = eachDayFromMonth.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );
      return {
        day,
        available:
          appointmentsInDay.length < 10 &&
          isBefore(currentDate, new Date(year, month - 1, day)),
      };
    });

    return monthAvailability;
  }
}

export default ListProviderMonthAvailabilityService;
