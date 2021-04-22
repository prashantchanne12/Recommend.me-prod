import asyncHandlers from 'express-async-handler';
import RecommendList from '../models/recommendListModel.js';
import User from '../models/userModel.js';

// @desc Add recommendation list in database
// @route POST /api/recommend/create
export const createRecommendList = asyncHandlers(async (req, res) => {
    const { data, tags } = req.body;

    const recommendList = await new RecommendList({
        data,
        owner: req.user._id,
        tags,
    }).save();

    if (recommendList) {

        // save the id in the user profile
        const user = await User.findById(req.user._id);
        if (user) {

            user.recommendations = [...user.recommendations, recommendList._id];

            const updatedUser = await user.save();

            if (updatedUser) {
                res.send(updatedUser);
            } else {
                res.status(500);
                throw new Error('Error while adding post to user profile!');
            }

        } else {
            res.status(404);
            throw new Error('User not found!');
        }

    } else {
        res.status(500);
        throw new Error('Error while adding list');
    }
});