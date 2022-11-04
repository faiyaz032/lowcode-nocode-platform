import { populateRole } from '../services/roles.services.js';
import { getUser } from '../services/users.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const checkPermission = catchAsync(async (req, res, next) => {
  const { userId } = req.query;
  const { collection, docId } = req.params;

  if (userId || collection)
    throw new AppError(400, 'Please provide userId and collection with the request query ');

  //find the user
  const { role: roleTitle } = await getUser(userId);

  //if the role is super admin then pass the middleware
  if (roleTitle === 'super-admin') next();

  //populate the role
  const { permissions } = await populateRole(roleTitle, 'permissions');

  //if the request includes document ID then handle this
  if (docId) {
    //TODO: This can be another middleware
    const [correspondingPerm] = permissions.filter(permission => {
      const { docRef } = permission;
      return docRef === docId;
    });

    if (!correspondingPerm) throw new AppError(401, 'You are not permitted to access this data.');

    if (!correspondingPerm.actions.includes('read'))
      throw new AppError(401, 'You are not permitted.');

    next();
  }

  //check if permission contains the corresponding action
  permissions.forEach(permission => {
    const { collectionName, actions, docRef } = permission;

    if (collectionName !== collection)
      throw new AppError(401, 'Collection does not match. You are not permitted!');

    if (docRef) {
      throw new AppError(401, 'You are not permitted to access this data 1');
    }

    if (req.method === 'GET') {
      if (!actions.includes('read'))
        throw new AppError(401, 'You are not permitted to access this data. 2');
      next();
    }

    if (req.method === 'POST') {
      if (!actions.includes('create'))
        throw new AppError(401, 'You are not permitted to create this data. 3');
      next();
    }
  });
});

export default checkPermission;
