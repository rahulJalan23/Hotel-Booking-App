/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
export const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
export const ADMIN_KEY = process.env.ADMIN_KEY;
