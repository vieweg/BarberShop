import Router from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateAvatarUserService from '../services/UpdateAvatarUserService';
import ensureAuthenticated from '../midlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const userRoutes = Router();
const uploader = multer(uploadConfig);

userRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploader.single('avatar'),
  async (req, res) => {
    const updateAvatar = new UpdateAvatarUserService();
    const user = await updateAvatar.execute({
      idUser: req.user.id,
      fileName: req.file.filename,
    });

    delete user.password;
    return res.json(user);
  },
);

export default userRoutes;
