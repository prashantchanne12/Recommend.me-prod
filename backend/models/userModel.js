import mongoose from 'mongoose';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
};

const recommendationRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecommendList',
    required: true,
};


const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    loginMethod: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    image: { type: String },
    followers: [userRef],
    followings: [userRef],
    recommendations: [recommendationRef],
    upvotedRecommendations: [recommendationRef],
    bucket: [recommendationRef],
}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export default User;