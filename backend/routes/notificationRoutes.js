import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const notificationRoutes = express.Router();

// @route /api/notification
notificationRoutes.post('/upvote/:id', protect);
notificationRoutes.post('/follow/:id', protect);
notificationRoutes.post('/comment/:id', protect);

notificationRoutes.put('/remove/upvote/:id', protect);
notificationRoutes.put('/remove/follow/:id', protect);
notificationRoutes.put('/remove/comment/:id', protect);


export default notificationRoutes;