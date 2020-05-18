import { Router } from 'express';

import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

const passwordRoutes = Router();

passwordRoutes.post('/forgot', forgotPasswordController.create);
passwordRoutes.post('/reset', resetPasswordController.create);

export default passwordRoutes;
