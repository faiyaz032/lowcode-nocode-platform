import { populateRole } from '../services/roles.services.js';
import { getUser } from '../services/users.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const checkPermission = catchAsync(async (req, res, next) => {
  //extract userId, targetCollection and docId
  const { _id: userId } = req.user;
  const { targetCollection, id: docId } = req.params;

  //Check if userId and targetCollection is provided
  if (!userId || !targetCollection)
    throw new AppError(400, 'Please provide userId and collection with the request query ');

  //Find the user
  const { role: roleTitle } = await getUser(userId);

  //Ff the role is super admin then pass the middleware
  if (roleTitle === 'super-admin') return next();

  //populate the role
  const { permissions } = await populateRole(roleTitle, 'permissions');

  //if the request includes document ID then handle this
  if (docId) {
    //TODO: This can be another middleware

    const [correspondingPerm] = permissions.filter(permission => {
      const { docRef, collectionName } = permission;
      if (docRef === docId) return true;
      else if (docRef == null) return targetCollection == collectionName;
    });

    if (!correspondingPerm) {
      throw new AppError(401, 'You are not permitted to access this data. corres');
    }

    if (!correspondingPerm.actions.includes('read'))
      throw new AppError(401, 'You are not permitted.');
    return next();
  }

  //check if permission contains the corresponding action
  permissions.forEach(permission => {
    const { collectionName, actions, docRef } = permission;

    if (collectionName !== targetCollection)
      throw new AppError(401, 'Collection does not match. You are not permitted!');

    if (docRef) {
      throw new AppError(401, 'You are not permitted to access this data 1');
    }

    if (req.method == 'GET') {
      if (!actions.includes('read'))
        throw new AppError(401, 'You are not permitted to access this data. 2');
      return next();
    }

    if (req.method == 'POST') {
      if (!actions.includes('create'))
        throw new AppError(401, 'You are not permitted to create this data. 3');
      return next();
    }

    if (req.method == 'PATCH' || req.method == 'PUT') {
      if (!actions.includes('edit'))
        throw new AppError(401, 'You are not permitted to edit this data. 3');
      return next();
    }

    if (req.method == 'DELETE') {
      if (!actions.includes('delete'))
        throw new AppError(401, 'You are not permitted to delete this data. 3');
      return next();
    }
  });
});

export default checkPermission;
