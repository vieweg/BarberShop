import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import rateLImiter from './middlewares/rateLimiter';
import routes from './routes';
import storageConfig from '@config/storage';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/containers';

const app = express();
app.use(rateLImiter);
app.use(cors());

app.use(express.json());
app.use('/files', express.static(storageConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: { message: err.message } });
  }

  console.error(err);

  return res.status(500).json({ error: { message: 'Internal server error' } });
});

app.listen(3333, () => {
  console.log(':fire: Server started on port 3333!');
});
