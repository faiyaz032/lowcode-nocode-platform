import { populateRole } from '../services/roles.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const checkCrudItemPerm = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  console.log(role);

  if (role === 'super-admin') return next();

  const { permissions } = await populateRole(role, 'permissions');

  const isPermitted = permissions.some(perm => {
    return perm.canCreateCrudItem;
  });

  if (!isPermitted) throw new AppError(401, 'You are not permitted to create a crud item');

  return next();
});

export default checkCrudItemPerm;
