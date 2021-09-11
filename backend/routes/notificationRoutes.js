import express from 'express';
import { followNotification, getAllNotifications, readAllNotifications, removeFollowNotification, removeUpvoteNotification, upvoteNotification } from '../controllers/notificationControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const notificationRoutes = express.Router();

// @route /api/notification
notificationRoutes.post('/upvote/', protect, upvoteNotification);
notificationRoutes.post('/follow/', protect, followNotification);
notificationRoutes.post('/comment/', protect);

notificationRoutes.put('/remove/upvote', protect, removeUpvoteNotification);
notificationRoutes.put('/remove/follow/', protect, removeFollowNotification);
notificationRoutes.put('/remove/comment/:id', protect);

notificationRoutes.get('/', protect, getAllNotifications);
notificationRoutes.put('/readAll', protect, readAllNotifications);


export default notificationRoutes;