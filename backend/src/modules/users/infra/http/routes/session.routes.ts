import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();
const sessionRoutes = Router();

sessionRoutes.post('/', sessionsController.create);

export default sessionRoutes;
