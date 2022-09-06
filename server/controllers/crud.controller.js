import mongoose from 'mongoose';
import ModelExist from '../models/ModelExist.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import createModel from '../utils/createModel.js';

export const create = catchAsync(async (req, res) => {
  //create the requested crud model
  const Model = createModel(`${req.body.crudName}-crud`);
  const model = new Model(req.body);
  await model.save();

  //save record on the model is created
  await ModelExist.create({ exists: true, crudName: model.crudName });

  //create a data model
  createModel(`${req.body.crudName}`);

  //send response
  res.status(201).json({ data: model });
});

export const get = catchAsync(async (req, res) => {
  //get the corresponding from database
  const { db } = mongoose.connection;
  const data = await db.collection(`${req.params.crudName}-cruds`).findOne();

  //check if data exists or not
  if (!data) throw new AppError(404, 'No data found on this collection');

  //send response
  res.status(200).json(data);
});
