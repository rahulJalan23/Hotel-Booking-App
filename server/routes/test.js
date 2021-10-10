import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200).json({ message: 'Test  Generation Route working' });
});
export default router;
