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
    recommendation: recommendationRef,
    userId: userRef,
    data: {
        type: String
    },
    ownerId: userRef,

}, {
    timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;