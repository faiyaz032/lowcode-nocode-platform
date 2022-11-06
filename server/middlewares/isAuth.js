import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const isAuth = catchAsync(async (req, res, next) => {
  //check if request has the auth header
  const authHeader = req.get('Authorization');
  if (!authHeader) throw new AppError(400, 'Send  authorization header with the request');

  //extract the token from header
  const [, token] = authHeader.split(' ');
  if (!token) throw new AppError(400, 'Please provide a valid JWT token');

  //decode and check if its valid
  const decoded = jwt.verify(token, 'SECRET');
  if (!decoded) throw new AppError(401, 'Authentication Failed');

  //attach the user info in req object
  req.user = { _id: decoded._id, email: decoded.email };

  //pass to next handler
  next();
});

export default isAuth;
