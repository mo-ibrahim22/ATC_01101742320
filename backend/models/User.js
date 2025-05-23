import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';  // Add this import for crypto

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function(val) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        },
        message: 'Please provide a valid email'
      }
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // Keep this validator for registration
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
    language: {
      type: String,
      enum: ['en', 'ar'],
      default: 'en'
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    passwordResetToken: String,  // Add this field for password reset token
    passwordResetExpires: Date,  // Add this field for password reset expiration
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
