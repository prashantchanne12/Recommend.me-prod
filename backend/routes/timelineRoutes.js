import express from 'express';
import { getTimeline } from '../controllers/timelineControllers.js';

import { protect } from '../middlewares/authMiddleware.js';
const timelineRoutes = express.Router();

// @routes /api/timline
timelineRoutes.get('/', protect, getTimeline);

export default timelineRoutes;
