import mongoose from 'mongoose';

const getCrudItemsPromises = function (crudItems) {
  const arr = [];
  for (let i = 0; i < crudItems.length; i++) {
    const { db } = mongoose.connection;
    const crudItem = db.collection(`${crudItems[i]}-cruds`).findOne({});
    arr.push(crudItem);
  }
  return arr;
};

export default getCrudItemsPromises;
