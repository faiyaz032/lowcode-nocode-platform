import mongoose from 'mongoose';
import ModelExist from '../models/ModelExist.js';
import catchAsync from '../utils/catchAsync.js';
import createModel from '../utils/createModel.js';

export const create = catchAsync(async (req, res) => {
  const Model = createModel(`${req.body.crudName}-crud`);
  const model = new Model(req.body);
  await model.save();

  await ModelExist.create({ exists: true, crudName: model.crudName });
  res.status(201).json({ model });
});

export const get = catchAsync(async (req, res) => {
  const db = mongoose.connection.db;
  const data = await db.collection(`${req.params.crudName}-cruds`).findOne();
  res.status(200).json(data);
});
