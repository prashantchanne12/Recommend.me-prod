import asyncHandlers from 'express-async-handler';
import RecommendList from '../models/recommendListModel.js';
import User from '../models/userModel.js';

// @desc Add recommendation list in database
// @route POST /api/recommend/create
export const createRecommendList = asyncHandlers(async (req, res) => {
    const { data, tags, title } = req.body;

    const recommendList = await new RecommendList({
        title,
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

            user.recommendations.push(recommendList._id);
            const updatedUser = await user.save();

            if (updatedUser) {
                res.send(recommendList);
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

    // const recommendationList = await RecommendList.findById(id);
    const recommendationList = await RecommendList.findById(id).populate('comments');

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

const createUsersRecommendationLists = async (user) => {
    const uploadedRecommendations = user.recommendations;
    const upvotedRecommendations = user.upvotedRecommendations;
    const bucketRecommendations = user.bucket;

    let lists = {};

    lists['uploadedRecommendations'] = await getRecommendationLists(uploadedRecommendations);
    lists['upvotedRecommendations'] = await getRecommendationLists(upvotedRecommendations);
    lists['bucketRecommendations'] = await getRecommendationLists(bucketRecommendations);

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

    const lists = await createUsersRecommendationLists(user);

    res.send(lists);

});

// @desc Get users all recommendation lists by Id from database 
// @route GET /api/recommend/lists/u/:id
export const getUsersRecommendationListsById = asyncHandlers(async (req, res) => {

    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error('User not found!');
    }

    const lists = await createUsersRecommendationLists(user);

    res.send(lists);

});

// @desc Upvote the recommend list
// @route PUT /api/recommend/list/upvote/:id 
export const upvoteRecommendationList = asyncHandlers(async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    const recommendList = await RecommendList.findById(id);

    if (recommendList) {

        recommendList.upvotes.push(userId);
        const newRecommendList = await recommendList.save();

        if (newRecommendList) {

            // update user's upvoted recommendations array
            const user = await User.findById(userId);

            if (user) {
                user.upvotedRecommendations.push(id);
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

// @desc Remove upvote from the recommend list
// @route PUT /api/recommend/list/removeUpvote/:id 
export const removeUpvoteFromRecommendationList = asyncHandlers(async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    const recommendList = await RecommendList.findById(id);

    if (recommendList) {

        recommendList.upvotes.splice(userId, 1);
        const newRecommendList = await recommendList.save();

        if (newRecommendList) {

            // update user's upvoted recommendations array
            const user = await User.findById(userId);

            if (user) {
                user.upvotedRecommendations.splice(id, 1);
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

            user.bucket.push(id);
            const newUser = await user.save();

            if (newUser) {

                // add user's id into the addedInBucket

                // // check if its already in bucket
                // const isUserIdInBucket = recommendList.addedInBucket.find(item => item == userId);
                // if (isUserIdInBucket) {
                //     res.status(400);
                //     throw new Error('Recommendation already in the bucket list');
                // }

                recommendList.addedInBucket.push(userId);
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

// PRIVATE
// @desc Delete the recommend list
// @route DELETE /api/recommend/list/delete/:id 
export const deleteRecommendList = asyncHandlers(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findById(req.user._id);
    const index = user.recommendations.indexOf(id);

    if (index > -1) {

        if (user) {

            user.recommendations.splice(index, 1);
            var deleted = await user.save();

        } else {
            res.status(404);
            throw new Error('User not find!');
        }

        await RecommendList.findByIdAndDelete(id);

        if (deleted) {
            res.send('deleted');
        }

    } else {
        res.status(404);
        throw new Error('PostId is incorrect');
    }
});

// PRIVATE
// @desc Delete the recommend list from bucket
// @route DELETE /api/recommend/list/bucket/:id
export const deleteRecommendListFromBucket = asyncHandlers(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findById(req.user._id);
    const recommendList = await RecommendList.findById(id);
    const index = user.bucket.indexOf(id);

    if (index > -1) {

        if (user) {

            user.bucket.splice(index, 1);
            var deleted = await user.save();

        } else {
            res.status(404);
            throw new Error('User not find!');
        }

        const userIndex = recommendList.addedInBucket.indexOf(req.user._id);
        if (userIndex > -1) {
            recommendList.addedInBucket.splice(userIndex, 1);
            await recommendList.save();
        }

        if (deleted) {
            res.send('deleted');
        }

    } else {
        res.status(404);
        throw new Error('PostId is incorrect');
    }
});