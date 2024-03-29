import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middlewares/authMw';
import {
  handleLogin,
  handleRegistration,
  protectedRoute,
  handleGoogleAuth,
} from '../controllers/authControllers';

router.post('/register', handleRegistration);
router.post('/login', handleLogin);
router.post('/auth/google', handleGoogleAuth);
router.get('/protected', authMiddleware, protectedRoute);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'working Properly' });
});

export default router;
