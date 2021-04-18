import mongoose from 'mongoose';

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
    loginMethod: {
        type: String,
        required: true,
    },
    image: { type: String },

}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export default User;