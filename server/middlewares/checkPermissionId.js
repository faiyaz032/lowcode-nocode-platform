import catchAsync from '../utils/catchAsync.js';

const checkPermissionId = catchAsync(async (req, res) => {
  
  const [correspondingPerm] = permissions.filter(permission => {
    const { docRef } = permission;
    return docRef === docId;
  });

  if (!correspondingPerm)
    throw new AppError(401, 'You are not permitted to access this data. corres');

  if (!correspondingPerm.actions.includes('read'))
    throw new AppError(401, 'You are not permitted.');

  return next();
});

export default checkPermissionId;
