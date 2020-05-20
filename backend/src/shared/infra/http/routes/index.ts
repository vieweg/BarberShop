import Router from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import providerRoutes from '@modules/appointments/infra/http/routes/provider.routes';
import ensureAuthenticated from '@modules/users/infra/http/midlewares/ensureAuthenticated';

const routes = Router();

routes.use('/appointments', ensureAuthenticated, appointmentsRoutes);
routes.use('/providers', ensureAuthenticated, providerRoutes);

routes.use('/profile', ensureAuthenticated, profileRoutes);
routes.use('/users', userRoutes);

routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes);

export default routes;
