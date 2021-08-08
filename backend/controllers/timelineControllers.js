import asyncHandler from 'express-async-handler';
import Timeline from '../models/timeline.js';

// @desc Get user profile
// @route /api/timeline/
// @access Private
export const getTimeline = asyncHandler(async (req, res) => {

    const timeline = await Timeline.findOne({
        userId: req.user._id
    }).populate('recommendations');

    res.send(timeline);

});