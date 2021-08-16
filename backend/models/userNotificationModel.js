import mongoose from 'mongoose';

const notificationRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: true,
}

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
}

const UserNotificationSchema = new mongoose.Schema({

    userId: userRef,
    id: {
        type: String,
        required: true,
    },
    notifications: [notificationRef],
});

const UserNotification = mongoose.model('UserNotification', UserNotificationSchema);

export default UserNotification;