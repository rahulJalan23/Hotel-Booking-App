import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/config';
import User from '../model/userModel';
export const authMiddleware = async (req, res, next) => {
  //   console.log(req.headers, req.header);
  const token = req.headers.authorization.split(' ')[1];

  try {
    const valueBool = await jwt.verify(token, ACCESS_TOKEN_KEY);

    console.log(valueBool);
    console.log('reached the end of block');
    return next();
  } catch (err) {
    if (err.name == 'TokenExpiredError') {
      try {
        console.log('Block 2');
        const refToken = req.header('x-auth-refToken');
        console.log('Block 2 ', refToken);
        const decoded = await jwt.verify(refToken, REFRESH_TOKEN_KEY);
        req.user.id = decoded._id;
        console.log('verified refreash token');
        const myUser = User.findById(decoded._id);
        myUser.generateAuthTokens;
        const { activeToken, refreshToken } = myUser.generateAuthTokens;
        res.setHeader('x-auth-token', activeToken);
        res.setHeader('x-auth-refToken', refreshToken);
        next();
      } catch (err) {
        res.status(400).json({ err: err });
      }
    } else {
      res.staus(400).json(err);
    }
  }
};
