import mongoose from 'mongoose';

export const getCrudsModelData = async modelName => {
  try {
    const { db } = mongoose.connection;
    return db.collection(`${modelName}-cruds`).findOne();
  } catch (error) {
    throw error;
  }
};
