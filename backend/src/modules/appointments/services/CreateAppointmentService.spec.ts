import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let appointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );
  });

  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      provider_id: '123123',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('Should not be able to create a new appointment in same time', async () => {
    const date = new Date();

    await createAppointmentService.execute({
      provider_id: '123123',
      date: date,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '123123',
        date: date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
