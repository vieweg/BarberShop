import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Joi, Segments } from 'celebrate';

import UserProfileController from '../controllers/UserProfileController';
import UserAvatarController from '../controllers/UserAvatarController';

const userProfileController = new UserProfileController();
const userAvatarController = new UserAvatarController();

const profileRoutes = Router();
const uploader = multer(uploadConfig);

profileRoutes.get('/', userProfileController.show);

profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      old_password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  userProfileController.update,
);

profileRoutes.patch(
  '/avatar',
  uploader.single('avatar'),
  userAvatarController.update,
);

export default profileRoutes;
