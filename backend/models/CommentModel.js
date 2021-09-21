import mongoose from 'mongoose';
import Populate from '../utils/autopopulate.js';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
};

const commentRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
}

const CommentSchema = new mongoose.Schema({

    fromUserName: {
        type: String,
        required: true,
    },
    fromUserDisplayName: {
        type: String,
        required: true,
    },
    fromUserImage: {
        type: String,
        required: true,
    },
    fromUserId: userRef,
    replies: [commentRef],
    body: {
        type: String,
        required: true,
    },
    upvotes: [userRef],

}, {
    timestamps: true,
});

CommentSchema
    .pre('findOne', Populate('replies'))
    .pre('find', Populate('replies'));

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;