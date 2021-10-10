import express from 'express';
const router = express.Router();
import User from './../model/userModel';
// import { ADMIN_KEY } from '../utils/config';

// const adminAuth = async (req, res, next) => {
//   const { adminKey } = req.body;
//   try {
//     if (adminKey == ADMIN_KEY) next();
//     else throw new Error('Please Provide a valid admin key.');
//   } catch (err) {
//     if (err) res.sendStatus(400).send(err);
//   }
// };

// router.use(adminAuth);

router.get('/', (req, res) => {
  res.sendStatus(200).json({ message: 'Admin Generation Route working' });
});

router.get('/getusers', async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.status(200).send({ stauts: 200, total: users.length, users });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete('/deleteall', async (req, res) => {
  const del = await User.deleteMany({}).exec();
  console.log(del);
  res.send('All Users Deleted');
});

export default router;
