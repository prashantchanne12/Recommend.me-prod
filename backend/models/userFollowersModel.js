import mongoose from 'mongoose';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
};

const UserFollowerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    followers: [userRef],
}, {
    timestamps: true,
});

const UserFollowers = mongoose.model('UserFollowers', UserFollowerSchema);

export default UserFollowers;