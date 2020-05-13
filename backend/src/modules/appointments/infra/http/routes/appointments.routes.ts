import Router from 'express';

import AppointmentsController from '../controllers/ApointmentsController';

const appointmentsController = new AppointmentsController();
const appointmentsRoutes = Router();

appointmentsRoutes.get('/', appointmentsController.index);

appointmentsRoutes.post('/', appointmentsController.create);

appointmentsRoutes.delete('/:id', appointmentsController.delete);

export default appointmentsRoutes;
