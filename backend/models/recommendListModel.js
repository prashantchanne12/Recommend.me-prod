import mongoose from 'mongoose';

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
}

const commentRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
}


const RecommendListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
    ownerUserName: {
        type: String,
        required: true,
    },
    ownerPhotoUrl: {
        type: String,
    },
    tags: [
        {
            type: Object,
            required: true,
        }
    ],
    comments: [commentRef],
    addedInBucket: [userRef],
}, {
    timestamps: true,
});

const RecommendList = mongoose.model('RecommendList', RecommendListSchema);

export default RecommendList;