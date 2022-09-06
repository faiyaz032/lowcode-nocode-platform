import User from '../models/User.js';

export const createUser = async data => {
  try {
    const user = new User(data);
    return user.save();
  } catch (error) {
    throw error;
  }
};
