import mongoose from 'mongoose';

function createModel(prefix) {
  const schema = new mongoose.Schema({}, { strict: false });
  return mongoose.model(prefix, schema);
}

export default createModel;
