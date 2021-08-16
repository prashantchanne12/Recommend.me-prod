import express from 'express';
import { getAllNotifications, readAllNotifications, removeUpvoteNotification, upvoteNotification } from '../controllers/notificationControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const notificationRoutes = express.Router();

// @route /api/notification
notificationRoutes.post('/upvote/', protect, upvoteNotification);
notificationRoutes.post('/follow/', protect);
notificationRoutes.post('/comment/', protect);

notificationRoutes.delete('/remove/upvote/:id', protect, removeUpvoteNotification);
notificationRoutes.put('/remove/follow/:id', protect);
notificationRoutes.put('/remove/comment/:id', protect);

notificationRoutes.get('/', protect, getAllNotifications);
notificationRoutes.put('/readAll', protect, readAllNotifications);


export default notificationRoutes;