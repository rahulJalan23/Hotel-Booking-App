import jwt from 'jsonwebtoken';

import User from '../model/userModel';

// Route is @"/api/register"
export const handleRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name) return res.status(400).send('Name is required');
  if (!password || password.length < 6)
    return res
      .status(400)
      .send('Password is required and should be min 6 characters long');
  let userExist = await User.findOne({ email }).exec();

  if (userExist) return res.status(400).send('Email is taken');

  const user = new User({
    name,
    email,
    password,
  });

  try {
    const { activeToken, refreshToken } = await user.generateAuthTokens();
    console.log('USER CREATED', user, activeToken, refreshToken);

    return res.json({ ok: true, user, activeToken, refreshToken });
  } catch (err) {
    console.log('CREATE USER FAILED', err);

    return res.status(400).send('Error. Try again.');
  }
};

export const handleLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.email;
    let user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(400).json({ err: `No user registed with ${email}.` });
      return;
    } else {
      //Check if no user with the given e-mail is found. If so, return error.

      let testPass = await user.login(password);
      if (testPass == true) {
        const { activeToken, refreshToken } = await user.generateAuthTokens();
        res.send({ ok: true, user, activeToken, refreshToken });
      } else {
        try {
          res.status(404).json({
            err: 'Incorrect password for the given e-mail.',
          });
        } catch {
          console.log('Error with sending response');
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const handleGoogleAuth = async (req, res) => {
  try {
    const token =
      req.body.tokenId ||
      req.query.token ||
      req.body.token ||
      req.headers['token'];
    const data = await jwt.decode(token);
    const email = data.email;
    let user = await User.findOne({ email }).exec();
    if (!user) {
      // register user

      user = new User({
        name: data.name,
        email,
        password: 'GoogleDummyPass',
        imgUrl: data.picture,
        googleId: data.sub,
      });

      try {
        const { activeToken, refreshToken } = await user.generateAuthTokens();
        console.log('USER CREATED', user, activeToken, refreshToken);

        return res.json({ ok: true, user, activeToken, refreshToken });
      } catch (err) {
        console.log('CREATE USER FAILED', err);

        return res.status(400).send('Error. Try again.');
      }
    } else {
      // login user
      const { activeToken, refreshToken } = await user.generateAuthTokens();
      res.send({ ok: true, user, activeToken, refreshToken });
    }

    // res.send()
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
// Test Route
export const protectedRoute = async (req, res) => {
  res.json({ data: 'This is a protected route' });
};
