import mongoose from 'mongoose';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
            type: String,
            required: true,
        }
    ],
    comments: [
        {
            type: String,
            required: true,
            from: userRef,
            timestamp: { type: Date, default: Date.now() },
            upvotes: [userRef],
            downvotes: [userRef],
            replys: [comments]
        }
    ],
}, {
    timestamps: true,
});

const RecommendList = mongoose.model('RecommendList', RecommendListSchema);

export default RecommendList;