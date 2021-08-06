import express from 'express';
import {
    followUser,
    getUserProfile,
    getUserProfileById,
    unfollowUser,
} from '../controllers/userControllers.js';
import { protect } from '../middlewares/authMiddleware.js';
const userRoutes = express.Router();

// @route /api/user
userRoutes.get('/profile', protect, getUserProfile);
userRoutes.get('/profile/u/:id', getUserProfileById);
userRoutes.put('/follow/:id', protect, followUser);
userRoutes.put('/unfollow/:id', protect, unfollowUser);


export default userRoutes;