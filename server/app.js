import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import testDataRoutes from './routes/testData';
import testRoutes from './routes/test';
import adminRoutes from './routes/admin';

// eslint-disable-next-line no-undef
const morgan = require('morgan');

import { MONGODB_URI } from './utils/config';
const app = express();

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.error('There is an error with database Connection');
  });

// Middlewares
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

// Routes
app.use('/api', authRouter);
app.use('/admin', adminRoutes);

// Routes to create Dummy/Test Data
app.use('/testdata', testDataRoutes);

// Routes for testing
app.use('/test', testRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('I am the best');
});
export default app;
