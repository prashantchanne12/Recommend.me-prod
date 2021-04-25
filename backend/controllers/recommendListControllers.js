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
        ownerUserName: req.user.displayName,
        ownerPhotoUrl: req.user.image,
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
// @route GET /api/recommend/list/:id
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

// @desc Upvote the recommend list
// @route PUT /api/recommend/list/upvote/:id 
export const upvoteRecommendationList = asyncHandlers(async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    const recommendList = await RecommendList.findById(id);

    if (recommendList) {

        recommendList.upvotes = [...recommendList.upvotes, userId];
        const newRecommendList = await recommendList.save();

        if (newRecommendList) {

            // update user's upvoted recommendations array
            const user = await User.findById(userId);

            if (user) {
                user.upvotedRecommendations = [...user.upvotedRecommendations, id];
                const newUser = await user.save();

                if (newUser) {
                    res.send(newRecommendList);
                } else {
                    res.status(500);
                    throw new Error('Error while updating upvotes in User!');
                }

            } else {
                res.status(404);
                throw new Error('User not find!');
            }

        } else {
            res.status(500);
            throw new Error('Error while updating upvotes!');
        }

    } else {
        res.status(404);
        throw new Error('Recommend list not found!');
    }

});

// @desc Add the recommend list into the bucket
// @route PUT /api/recommend/list/bucket/:id 
export const addRecommendListToBucket = asyncHandlers(async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    const recommendList = await RecommendList.findById(id);

    if (recommendList) {

        const user = await User.findById(userId);

        if (user) {

            // check if id is already in bucket list
            const isInBucket = user.bucket.find(item => item == id);
            if (isInBucket) {
                res.status(400);
                throw new Error('Recommendation already in the bucket list');
            }

            user.bucket = [...user.bucket, id];
            const newUser = await user.save();

            if (newUser) {

                // add user's id into the addedInBucket

                // // check if its already in bucket
                // const isUserIdInBucket = recommendList.addedInBucket.find(item => item == userId);
                // if (isUserIdInBucket) {
                //     res.status(400);
                //     throw new Error('Recommendation already in the bucket list');
                // }

                recommendList.addedInBucket = [...recommendList.addedInBucket, userId];
                const newRecommendList = await recommendList.save();

                if (newRecommendList) {
                    res.send(newUser);
                } else {
                    throw new Error('Error while updating lists bucket!');
                }

            } else {
                res.status(500);
                throw new Error('Error while updating bucket list!');
            }
        } else {
            res.status(404);
            throw new Error('User not found!');
        }
    } else {
        res.status(404);
        throw new Error('Recommend list not found');
    }

});