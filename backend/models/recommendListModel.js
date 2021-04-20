import mongoose from 'mongoose';

const upvotedUserSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const tagSchema = mongoose.Schema({
    tag: {
        type: String,
        required: true,
    },
});

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
    }
});

const RecommendListSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
    upvotes: [upvotedUserSchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: [tagSchema],
    comments: [commentSchema],
}, {
    timestamps: true,
});

const RecommendList = mongoose.model('RecommendList', RecommendListSchema);

export default RecommendList;