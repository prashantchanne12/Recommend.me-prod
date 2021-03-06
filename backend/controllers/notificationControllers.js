import asyncHandlers from 'express-async-handler';
import Notification from '../models/notificationModel.js';
import UserNotification from '../models/userNotificationModel.js';

// @desc Add notification in database
// @route POST /api/notification/upvote
// @access PRIVATE
export const upvoteNotification = asyncHandlers(async (req, res) => {

    const { postId, ownerId, title } = req.body;

    const notification = await new Notification({
        type: 'upvote',
        recommendation: postId,
        userId: req.user.id,
        ownerId,
        title,
    }).save();

    if (notification) {
        return res.send(notification);
    }

    throw new Error('Error saving the Notification');

});

// @desc Delete recommendation list in database
// @route PUT api/notification/remove/upvote/:id
// @access PRIVATE
export const removeUpvoteNotification = asyncHandlers(async (req, res) => {

    const { type, recommendation } = req.body;

    const notification = await Notification.find({
        type,
        recommendation,
        userId: req.user._id,
    }).remove();

    res.send(notification);

    // if (notification) {
    //     return res.send('deleted!')
    // } else {
    //     throw new Error('Error while deleting notification');
    // }

});

// @desc Delete follow notification
// @route PUT api/notification/remove/follow
// @access PRIVATE
export const removeFollowNotification = asyncHandlers(async (req, res) => {

    const { ownerId } = req.body;


    const notification = await Notification.find({
        type: 'follow',
        ownerId,
        userId: req.user._id,
    }).remove();

    res.send(notification);

    // if (notification) {
    //     return res.send('deleted!')
    // } else {
    //     throw new Error('Error while deleting notification');
    // }

});

// @desc Get all notifications
// @route GET api/notification
// @access PRIVATE
export const getAllNotifications = asyncHandlers(async (req, res) => {

    const notifications = await UserNotification.findOne({
        userId: req.user._id
    })
        .populate('notifications')
        .populate({
            path: 'notifications',
            populate: {
                path: 'userId',
                model: 'User',
                select: { 'displayName': 1, 'userName': 1, 'image': 1 },
            }
        })

    res.send(notifications);


});

// @desc Read all notifications
// @route PUT api/notification/readAll
// @access PRIVATE
export const readAllNotifications = asyncHandlers(async (req, res) => {
    const notifications = await Notification.updateMany({ ownerId: req.user._id, seen: false }, { seen: true });
    res.send(notifications);
});

// @desc Follow notification
// @route PUT api/notification/follow
// @access PRIVATE
export const followNotification = asyncHandlers(async (req, res) => {

    const { ownerId } = req.body;

    const notification = await new Notification({
        type: 'follow',
        userId: req.user.id,
        ownerId,
    }).save();

    if (notification) {
        return res.send(notification);
    }

    throw new Error('Error saving the Notification');

});