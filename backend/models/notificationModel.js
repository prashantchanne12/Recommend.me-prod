import mongoose from 'mongoose';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
};

const recommendationRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecommendList',
};

const notificationSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    recommendation: recommendationRef,
    userId: userRef,
    ownerId: userRef,
    data: {
        type: String
    },
    seen: {
        type: Boolean,
        required: true,
        default: false,
    }

}, {
    timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;