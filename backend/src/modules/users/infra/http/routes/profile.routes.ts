import Router from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserProfileController from '../controllers/UserProfileController';
import UserAvatarController from '../controllers/UserAvatarController';

const userProfileController = new UserProfileController();
const userAvatarController = new UserAvatarController();

const profileRoutes = Router();
const uploader = multer(uploadConfig);

profileRoutes.get('/', userProfileController.show);

profileRoutes.put('/', userProfileController.update);

profileRoutes.patch(
  '/avatar',
  uploader.single('avatar'),
  userAvatarController.update,
);

export default profileRoutes;
