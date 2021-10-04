// import jwt from "jsonwebtoken";

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

// Route Not Checked.. Create when Offline
export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.findOne({ email }, async (err, data) => {
      //Check if no user with the given e-mail is found. If so, return error.
      console.log(data);
      if (!data) {
        res.status(400).json({ err: `No user registed with ${email}.` });
      }
      let testPass = await data.login(password);
      if (testPass == true) {
        const { activeToken, refreshToken } = await data.generateAuthTokens();
        res.status(200).send({ ok: true, data, activeToken, refreshToken });
      } else {
        res.status(404).json({
          err: 'Incorrect password for the given e-mail.',
        });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Test Route
export const protectedRoute = async (req, res) => {
  res.json({ data: 'This is a protected route' });
};
