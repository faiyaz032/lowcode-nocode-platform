import mongoose from 'mongoose';
import ModelExist from '../models/ModelExist.js';

const getModel = async modelToFind => {
  const model = await ModelExist.findOne({ crudName: modelToFind });
  if (model) return mongoose.model(`${modelToFind}-cruds`).find();
  return false;
};

export default getModel;
