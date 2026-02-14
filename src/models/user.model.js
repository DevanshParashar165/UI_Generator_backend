import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Guest User',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [5, 'Password must be of minimum 5 characters'],
    },
    email: {
      type: String,
      required : true,
      unique: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId : this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

export const User = mongoose.model('User', userSchema);
