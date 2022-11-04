import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  exists: Boolean,
  crudName: String,
});

const ModelExist = mongoose.model('ModelExist', schema);

export default ModelExist;
