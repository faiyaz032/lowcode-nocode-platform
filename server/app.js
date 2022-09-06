import dotenv from 'dotenv';
import express from 'express';
import { defaultErrorHandler, notFoundHandler } from './middlewares/errorMiddlewares.js';
import crudRouter from './routes/crud.routes.js';
import dataRouter from './routes/data.routes.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api', crudRouter);
app.use('/api', dataRouter);

app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

export default app;
