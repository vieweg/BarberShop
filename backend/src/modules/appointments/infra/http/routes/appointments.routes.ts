import Router from 'express';

import AppointmentsController from '../controllers/ApointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', appointmentsController.index);

appointmentsRoutes.post('/', appointmentsController.create);

appointmentsRoutes.delete('/:id', appointmentsController.delete);

appointmentsRoutes.get('/me', providerAppointmentsController.index);

export default appointmentsRoutes;
