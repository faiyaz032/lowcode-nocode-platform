import ModelExist from './models/ModelExist.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const checkModelExists = catchAsync(async (req, res, next) => {
  const modelExists = await ModelExist.findOne({
    exists: true,
    crudName: `${req.body.crudName}`,
  });

  if (modelExists) {
    throw new AppError(400, `Crud model already exists`);
  }

  next();
});

export default checkModelExists;
