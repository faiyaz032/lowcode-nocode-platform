import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import { defaultErrorHandler, notFoundHandler } from './middlewares/errorMiddlewares.js';
import authRouter from './routes/auth.routes.js';
import crudRouter from './routes/crud.routes.js';
import dataRouter from './routes/data.routes.js';

const app = express();

dotenv.config();

app.use(logger('dev'));

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

//!Just a check route to check the middleware. Will be removed later
// app.get('/check/:rooms', isAuth, checkPermission, (req, res) => {
//   res.send('Playing valorant');
// });

app.get('/', (req, res) => {
  res.send('Welcome to modular admin panel. DATABASE');
});

app.use('/api', crudRouter);
app.use('/api', dataRouter);
app.use('/api', authRouter);

app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

export default app;
