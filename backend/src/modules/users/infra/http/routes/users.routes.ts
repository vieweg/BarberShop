import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default userRoutes;
