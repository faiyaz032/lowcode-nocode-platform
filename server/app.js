import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import checkPermission from './middlewares/checkPermissions.js';
import { defaultErrorHandler, notFoundHandler } from './middlewares/errorMiddlewares.js';
import crudRouter from './routes/crud.routes.js';
import dataRouter from './routes/data.routes.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

//!Just a check route to check the middleware. Will be removed later
app.get('/check/:collection/:docId', checkPermission, (req, res) => {
  res.send('Playing valorant');
});

// app.get('/check/:collection', checkPermission, (req, res) => {
//   res.send('you are playing all the games');
// });

app.get('/', (req, res) => {
  res.send('Welcome to modular admin panel. DATABASE');
});

app.use('/api', crudRouter);
app.use('/api', dataRouter);

app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

export default app;
