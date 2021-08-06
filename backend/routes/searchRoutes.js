import express from 'express';
import { searchUserProfile } from '../controllers/searchControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

const searchRoutes = express.Router();

// public
// @route /api/search/profile
searchRoutes.post('/profile', searchUserProfile);

export default searchRoutes;