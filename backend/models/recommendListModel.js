import mongoose from 'mongoose';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
}

const comment = {
    type: String,
    required: true,
    from: userRef,
    timestamp: { type: Date, default: Date.now() },
    upvotes: [userRef],
    downvotes: [userRef],
}


const RecommendListSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
    upvotes: [userRef],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: [
        {
            type: Object,
            required: true,
        }
    ],
    comments: [
        {
            ...comment,
            replys: [comment]
        }
    ],
}, {
    timestamps: true,
});

const RecommendList = mongoose.model('RecommendList', RecommendListSchema);

export default RecommendList;