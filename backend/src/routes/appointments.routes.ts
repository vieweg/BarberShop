import Router from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (req, res) =>
  res.json(appointmentsRepository.listAll()),
);

appointmentsRoutes.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: { message: err.message } });
  }
});

export default appointmentsRoutes;
