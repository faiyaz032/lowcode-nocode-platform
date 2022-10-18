import { getIQVFields } from '../services/data.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const checkIQVFields = catchAsync(async (req, res, next) => {
  const { targetCollection } = req.params;
  const requestedQueryFields = Object.keys(req.query);

  const iqvFields = await getIQVFields(targetCollection);

  requestedQueryFields.forEach(requestedQueryField => {
    if (!iqvFields.includes(requestedQueryField))
      throw new AppError(400, 'Your requested query variable is not valid');
  });

  next();
});

export default checkIQVFields;
