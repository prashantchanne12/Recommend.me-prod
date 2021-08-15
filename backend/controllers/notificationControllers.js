import asyncHandlers from 'express-async-handler';
import Notification from '../models/notificationModel.js';

// @desc Add recommendation list in database
// @route POST /api/recommend/create
// @access PRIVATE
export const upvoteNotification = asyncHandlers(async (req, res) => {

    const { postId, ownerId, userName } = req.body;

    const notification = await new Notification({
        type: 'upvote',
        recommendation: postId,
        userId: req.user.id,
        ownerId,
        userName,
    }).save();

    if (notification) {
        return res.send(notification);
    }

    throw new Error('Error saving the Notification');

});