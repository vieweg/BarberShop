import { Router } from 'express';
import AuthenticateService from '../services/AuthenticateService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authenticateService = new AuthenticateService();

  const { user, token } = await authenticateService.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionRoutes;
