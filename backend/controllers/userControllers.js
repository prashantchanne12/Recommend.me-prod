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

            await new UserFollowers({
                owner: id,
                followerUserId: currentUserId
            }).save();


        } else {
            throw new Error('User has already been followed!');
        }

        // add the follow user's id in current user's followings
        if (!currentUser.followings.includes(id)) {

            currentUser.followings.push(id);
            const newUser = await currentUser.save();

            await new UserFollowings({
                owner: currentUserId,
                followingUserId: id
            }).save();

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

    if (unfollowUser && currentUser) {

        // remove current user's id from the follow user's followers
        unfollowUser.followers.splice(currentUserId, 1);
        await unfollowUser.save();
        await UserFollowers.findOneAndRemove({ owner: id, followerUserId: currentUserId });

        // remove follow user's id from the current user's followings
        currentUser.followings.splice(id, 1);
        const newUser = await currentUser.save();
        await UserFollowings.findOneAndRemove({ owner: currentUserId, followingUserId: id });

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
        const user = await User.findById(id);
        user.userName = userName;
        const updatedUser = await user.save();

        if (updatedUser) {
            return res.send(updatedUser.userName);
        } else {
            throw new Error('Error while updating user name');
        }

    } else {
        throw new Error('Username is already taken!');
    }
});