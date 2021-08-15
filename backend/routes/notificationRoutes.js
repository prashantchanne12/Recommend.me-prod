import express from 'express';
import { upvoteNotification } from '../controllers/notificationControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const notificationRoutes = express.Router();

// @route /api/notification
notificationRoutes.post('/upvote/', protect, upvoteNotification);
notificationRoutes.post('/follow/', protect);
notificationRoutes.post('/comment/', protect);

notificationRoutes.put('/remove/upvote/:id', protect);
notificationRoutes.put('/remove/follow/:id', protect);
notificationRoutes.put('/remove/comment/:id', protect);


export default notificationRoutes;