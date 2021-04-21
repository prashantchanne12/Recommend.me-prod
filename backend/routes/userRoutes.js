import express from 'express';
import { getUserProfile } from '../controllers/userControllers.js';
import { protect } from '../middlewares/authMiddleware.js';
const userRoutes = express.Router();

userRoutes.get('/profile', protect, getUserProfile);


export default userRoutes;