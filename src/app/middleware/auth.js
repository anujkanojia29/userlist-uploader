const jwt = require('jsonwebtoken');

//app
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const UserSchema = require('../models/user');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user =  await UserSchema.findById(decoded.id);
    
    // Check if user exist
    if(!req.user) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    // Check if user is active
    if(!req.user.isActive) {
      return next(new ErrorResponse('User not active', 401));
    }
  
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
