import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let appointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationRepository: FakeNotificationRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
      fakeNotificationRepository,
    );
  });

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 10).getTime();
    });

    const appointment = await createAppointmentService.execute({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 4, 20, 14),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
    expect(appointment.user_id).toBe('123456');
  });

  it('Should not be able to create a new appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 10).getTime();
    });
    await createAppointmentService.execute({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 4, 20, 14),
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '123123',
        user_id: '123456',
        date: new Date(2020, 4, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 10).getTime();
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '123123',
        user_id: '123456',
        date: new Date(2020, 4, 20, 9),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 10).getTime();
    });
    await expect(
      createAppointmentService.execute({
        provider_id: '123123',
        user_id: '123123',
        date: new Date(2020, 4, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment in time out of range(8h - 17h)', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 10).getTime();
    });
    await expect(
      createAppointmentService.execute({
        provider_id: '123123',
        user_id: '123456',
        date: new Date(2020, 4, 21, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        provider_id: '123123',
        user_id: '123456',
        date: new Date(2020, 4, 21, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
