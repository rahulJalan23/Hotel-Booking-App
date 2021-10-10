import faker from 'faker';
import User from '../model/userModel';
import express from 'express';
import app from '../app';
const router = express.Router();

router.post('/create/:num', async (req, res) => {
  const qty = parseInt(req.params.num);
  console.log(qty);
  for (let i = 0; i < qty; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    let userExist = await User.findOne({ email }).exec();
    if (userExist) continue;
    const user = await User({ name, email, password });
    // console.log(user);
    await user.generateAuthTokens();
  }
  const allUsers = await User.find({}).exec();
  res.send({ msg: 'working', total: allUsers.length });
});

router.get('/', (req, res) => {
  res.send('on route /testdata');
});
export default router;
