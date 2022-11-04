import Permission from '../middlewares/models/Permission.js';

export const createPermission = async data => {
  try {
    const permission = new Permission(data);
    return permission.save();
  } catch (error) {
    throw error;
  }
};
