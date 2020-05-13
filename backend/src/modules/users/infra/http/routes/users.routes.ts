import Router from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../midlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const userRoutes = Router();
const uploader = multer(uploadConfig);

userRoutes.post('/', usersController.create);

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploader.single('avatar'),
  userAvatarController.update,
);

export default userRoutes;
