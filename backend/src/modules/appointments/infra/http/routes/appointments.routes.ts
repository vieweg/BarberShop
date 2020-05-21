import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AppointmentsController from '../controllers/ApointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.string().isoDate(),
    },
  }),
  appointmentsController.create,
);
appointmentsRoutes.get('/me', providerAppointmentsController.index);

appointmentsRoutes.get('/', appointmentsController.index);
appointmentsRoutes.delete('/:id', appointmentsController.delete);

export default appointmentsRoutes;
