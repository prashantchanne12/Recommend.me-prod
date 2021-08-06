import express from 'express';
import { searchUserProfile } from '../controllers/searchControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

const searchRoutes = express.Router();

// @route /api/search/profile
searchRoutes.get('/profile', protect, searchUserProfile);

export default searchRoutes;