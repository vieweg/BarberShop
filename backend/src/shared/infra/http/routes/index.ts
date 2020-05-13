import Router from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';

import ensureAuthenticated from '@modules/users/infra/http/midlewares/ensureAuthenticated';

const routes = Router();

routes.use('/appointments', ensureAuthenticated, appointmentsRoutes);
routes.use('/users', userRoutes);

routes.use('/sessions', sessionRoutes);

export default routes;
