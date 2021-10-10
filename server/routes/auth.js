import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middlewares/authMw';
import {
  handleLogin,
  handleRegistration,
  protectedRoute,
} from '../controllers/authControllers';

router.post('/register', handleRegistration);
router.post('/login', handleLogin);
router.get('/protected', authMiddleware, protectedRoute);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'working Properly' });
});

export default router;
