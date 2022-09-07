import dotenv from 'dotenv';
import express from 'express';
import checkPermission from './middlewares/checkPermissions.js';
import { defaultErrorHandler, notFoundHandler } from './middlewares/errorMiddlewares.js';
import crudRouter from './routes/crud.routes.js';
import dataRouter from './routes/data.routes.js';

const app = express();

dotenv.config();

app.use(express.json());

//!Just a check route to check the middleware. Will be removed later
app.get('/check/:collection/:docId', checkPermission, (req, res) => {
  res.send('hitting');
});

app.post('/check/:collection', checkPermission, (req, res) => {
  res.send('posted');
});

app.use('/api', crudRouter);
app.use('/api', dataRouter);

app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

export default app;
