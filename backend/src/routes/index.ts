import Router from 'express';
import appointmentsRoutes from './appointments.routes';
import userRoutes from './users.routes';
import sessionRoutes from './session.routes';
import ensureAuthenticated from '../midlewares/ensureAuthenticated';

const routes = Router();

routes.use('/appointments', ensureAuthenticated, appointmentsRoutes);
routes.use('/users', userRoutes);

routes.use('/sessions', sessionRoutes);

export default routes;
