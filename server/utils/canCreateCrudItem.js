import { populateRole } from '../services/roles.services.js';

const canCreateCrudItem = async role => {
  console.log(role);
  if (role == 'super-admin') return true;
  const { permissions } = await populateRole(role, 'permissions');
  console.log(permissions);
  if (!permissions) return false;
  return permissions.some(permission => permission.canCreateCrudItem);
};

export default canCreateCrudItem;
