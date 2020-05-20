import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
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
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllDayProvider({
      provider_id,
      day,
      month,
      year,
    });

    const eachHourFromDay = [];

    for (let key = 8; key <= 17; key++) {
      eachHourFromDay.push(key);
    }

    const currentDate = new Date(Date.now());

    const dayAvailability = eachHourFromDay.map(hour => {
      const appointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !appointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return dayAvailability;
  }
}

export default ListProviderMonthAvailabilityService;
