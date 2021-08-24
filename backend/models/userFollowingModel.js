import mongoose from 'mongoose';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
};

const UserFollowingSchema = new mongoose.Schema({
    owner: userRef,
    followingUserId: userRef,
}, {
    timestamps: true,
});

const UserFollowings = mongoose.model('UserFollowings', UserFollowingSchema);

export default UserFollowings;