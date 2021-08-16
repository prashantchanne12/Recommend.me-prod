import asyncHandlers from 'express-async-handler';
import Notification from '../models/notificationModel.js';
import UserNotification from '../models/userNotificationModel.js';

// @desc Add notification in database
// @route POST /api/notification/upvote
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

// @desc Delete recommendation list in database
// @route POST api/notification/remove/upvote/:id
// @access PRIVATE
export const removeUpvoteNotification = asyncHandlers(async (req, res) => {

    const id = req.params.id;

    const notification = await Notification.findByIdAndDelete(id);

    if (notification) {
        return res.send('deleted!')
    } else {
        throw new Error('Error while deleting notification');
    }

});

// @desc Get all notifications
// @route GET api/notification
// @access PRIVATE
export const getAllNotifications = asyncHandlers(async (req, res) => {

    const notifications = await UserNotification.findOne({
        userId: req.user._id
    }).populate('notifications');

    if (notitfication) {
        res.send(notifications);
    }

});