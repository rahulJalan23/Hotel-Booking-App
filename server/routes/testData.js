import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200).json({ message: 'Test Data Generation Route working' });
});
export default router;
