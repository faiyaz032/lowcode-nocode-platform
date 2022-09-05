import dotenv from 'dotenv';
import express from 'express';
import { defaultErrorHandler, notFoundHandler } from './middlewares/errorMiddlewares.js';
import crudRouter from './routes/crud.routes.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api', crudRouter);

app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

export default app;
