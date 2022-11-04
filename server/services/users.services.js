import User from '../models/User.js';

export const createUser = async data => {
  try {
    const user = new User(data);
    return user.save();
  } catch (error) {
    throw error;
  }
};

export const getUser = async id => {
  try {
    return User.findById(id);
  } catch (error) {
    throw error;
  }
};
