import User from '../models/User.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { createSendToken } from '../services/auth.service.js';

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, language = 'en' } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    language
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};



export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } = req.body;

  if (!currentPassword || !newPassword || !passwordConfirm) {
    return next(new AppError('Please provide all required fields.', 400));
  }

  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(new AppError('User not found.', 404));
  }


  const isCorrect = await user.correctPassword(currentPassword, user.password);
  if (!isCorrect) {
    return next(new AppError('Your current password is wrong.', 401));
  }


  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;

  await user.save();

  createSendToken(user, 200, res);
});


