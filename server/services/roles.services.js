import Role from '../middlewares/models/Role.js';

export const createRole = async data => {
  try {
    const role = new Role(data);
    return role.save();
  } catch (error) {
    throw error;
  }
};

export const populateRole = async (roleTitle, fieldToPopulate) => {
  try {
    return Role.findOne({ title: roleTitle }).populate(fieldToPopulate);
  } catch (error) {
    throw error;
  }
};
