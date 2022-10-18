import mongoose from 'mongoose';

//TODO: Try to find a way to do it in a more better way..
export const getCrudsModelData = async modelName => {
  try {
    const { db } = mongoose.connection;
    return db.collection(`${modelName}-cruds`).findOne();
  } catch (error) {
    throw error;
  }
};

export const getIQVFields = async targetCollection => {
  const { inputFields } = await getCrudsModelData(targetCollection);

  return inputFields
    .filter(inputField => {
      if (inputField.iqv === true) return inputField.name;
    })
    .map(inputField => inputField.name);
};
