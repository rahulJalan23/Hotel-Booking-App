import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/config';
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      min: 2,
    },
    password: {
      type: String,
      required: 'Password is required',
      min: 6,
    },
    email: {
      type: String,
      trim: true,
      required: 'Email is required',
      unique: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// Model method to generate acive and refresh tokens
userSchema.methods.generateAuthTokens = async function () {
  try {
    console.log(this);
    console.log(ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY);
    const activeToken = jwt.sign(
      { _id: this._id.toString() },
      ACCESS_TOKEN_KEY,
      {
        expiresIn: '1d',
      }
    );
    const refreshToken = jwt.sign(
      { _id: this._id.toString() },
      REFRESH_TOKEN_KEY,
      {
        expiresIn: '1w',
      }
    );
    this.refreshToken = refreshToken;
    await this.save();
    return { activeToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.login = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    return error;
  }
};

// A "pre" function to be used while saving in order to generate password hash
userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    return bcrypt.hash(user.password, 10, function (err, hashedPass) {
      if (err) {
        console.log({
          status: 400,
          title: 'Err Bcrypt Hash in Model',
          message: err,
        });

        return next(err);
      }
      user.password = hashedPass;
      return next();
    });
  }
  return next();
});
export default mongoose.model('User', userSchema);
