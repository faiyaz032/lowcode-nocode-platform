import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import canCreateCrudItem from '../utils/canCreateCrudItem.js';
import catchAsync from '../utils/catchAsync.js';

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new AppError(200, 'Please provide email and password');

  const user = await User.findOne({ email: email });

  if (!user) throw new AppError(401, 'Incorrect email or password');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new AppError(401, 'Incorrect email or password');

  //TODO: Need to change the jwt secret
  const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, 'SECRET', {
    expiresIn: '20h',
  });

  res.status(200).json({
    status: 'success',
    message: 'Login succeed',
    token,
    canCreateCrudItem: await canCreateCrudItem(user.role),
    userId: user._id,
  });
});
