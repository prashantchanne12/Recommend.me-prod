import mongoose from 'mongoose';

const postRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecommendList',
    required: true,
}

const userRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
}

const TimelineSchema = new mongoose.Schema({

    userId: userRef,
    id: {
        type: String,
        required: true,
    },
    recommendations: [postRef],
});

const Timeline = mongoose.model('Timeline', TimelineSchema);

export default Timeline;