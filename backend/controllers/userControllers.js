import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import UserFollowings from '../models/userFollowingModel.js';
import UserFollowers from '../models/userFollowersModel.js';

// @desc Get user profile
// @route /api/user/profile
// @access Private
export const getUserProfile = asyncHandler((req, res) => {

    if (req.user) {
        res.send(req.user);
    } else {
        res.status(404);
        throw new Error('User not found!');
    }

});
// @desc Get user profile by Id
// @route /api/user/profile
// @access Private
export const getUserProfileById = asyncHandler(async (req, res) => {

    const userId = req.params.id;

    const user = await User.findById(userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404);
        throw new Error('User not found!');
    }

});

// @desc Follow user
// @route /api/user/follow/:id
// @access Private
export const followUser = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const currentUserId = req.user._id;

    const followUser = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (followUser && currentUser) {

        // add the current user's id in follow user's followers
        if (!followUser.followers.includes(currentUserId)) {

            followUser.followers.push(currentUserId);
            await followUser.save();

            const userFollowers = await UserFollowers.findOne({ userId: id });

            if (!userFollowers) {

                await new UserFollowers({
                    userId: id,
                    followers: [currentUserId]
                }).save();

            } else {
                userFollowers.followers.push(currentUserId);
                await userFollowers.save();

            }


        } else {
            throw new Error('User has already been followed!');
        }

        // add the follow user's id in current user's followings
        if (!currentUser.followings.includes(id)) {

            currentUser.followings.push(id);
            const newUser = await currentUser.save();


            const userFollowings = await UserFollowings.findOne({ userId: id });

            if (!userFollowings) {

                await new UserFollowings({
                    userId: currentUserId,
                    followings: [id]
                }).save();

            } else {

                userFollowings.followings.push(id)
                await userFollowings.save();

            }

            if (newUser) {
                res.send(newUser);
            } else {
                res.status(500);
                throw new Error('Error while updating follow')
            }


        } else {
            throw new Error('User has already been followed!');
        }

    } else {
        res.status(404);
        throw new Error('User not found!');
    }
});

// @desc Unfollow user
// @route /api/user/unfollow/:id
// @access Private
export const unfollowUser = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const currentUserId = req.user._id;

    const unfollowUser = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    const unfollow1 = await UserFollowings.findOne({ userId: currentUserId });
    const unfollow2 = await UserFollowers.findOne({ userId: id });

    if (unfollowUser && currentUser) {

        // remove current user's id from the follow user's followers
        unfollowUser.followers.splice(currentUserId, 1);
        await unfollowUser.save();

        unfollow2.followers.splice(currentUserId, 1);
        await unfollow2.save();

        // remove follow user's id from the current user's followings
        currentUser.followings.splice(id, 1);
        const newUser = await currentUser.save();

        unfollow1.followings.splice(id, 1);
        await unfollow1.save();

        if (newUser) {
            res.send(newUser);
        } else {
            res.status(500);
            throw new Error('Error while updating unfollow');
        }

    } else {
        res.status(404);
        throw new Error('User not found!');
    }
});

// @desc Change Username
// @route /api/user/changeUsername
// @access Private
export const changeUserName = asyncHandler(async (req, res) => {

    const id = req.user._id;
    const userName = req.params.userName;

    // check if the provided username already exists
    const user = await User.findOne({ userName });

    if (!user) {
        const updatedUser = await User.findByIdAndUpdate(id, { userName });

        if (updatedUser) {
            res.send(updatedUser);
        } else {
            throw new Error('Error while updating user name');
        }

    } else {
        throw new Error('Username is already taken!');
    }


    res.send(user);

});