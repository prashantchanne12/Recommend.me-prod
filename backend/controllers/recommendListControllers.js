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


// @desc Get recommendation list from database
// @route GET /api/recommend/:id
export const getRecommendationList = asyncHandlers(async (req, res) => {

    const id = req.params.id;

    const recommendationList = await RecommendList.findById(id);

    if (recommendationList) {

        res.send(recommendationList);

    } else {
        res.status(404)
        throw new Error('Recommendation list not found with id ' + id);
    }

});

const getRecommendationLists = async (ids) => {

    let lists = [];

    if (ids.length === 0) {
        return lists;
    }

    for (let i = 0; i < ids.length; i++) {
        const recommendList = await RecommendList.findById(ids[i]);
        lists.push(recommendList);
    }

    return lists;
}

// @desc Get users all recommendation lists from database
// @route GET /api/recommend/lists
export const getUsersRecommendationLists = asyncHandlers(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found!');
    }

    const uploadedRecommendations = user.recommendations;
    const upvotedRecommendations = user.upvotedRecommendations;
    const bucketRecommendations = user.bucket;

    let lists = {};

    lists['uploadedRecommendations'] = await getRecommendationLists(uploadedRecommendations);
    lists['upvotedRecommendations'] = await getRecommendationLists(upvotedRecommendations);
    lists['bucketRecommendations'] = await getRecommendationLists(bucketRecommendations);

    res.send(lists);

});