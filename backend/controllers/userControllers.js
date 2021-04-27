import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

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
        followUser.followers.push(currentUserId);
        await followUser.save();

        // add the follow user's id in current user's followings
        currentUser.followings.push(id);
        const newUser = await currentUser.save();

        if (newUser) {
            res.send(newUser);
        } else {
            res.status(500);
            throw new Error('Error while updating follow')
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

        // remove follow user's id from the current user's followings
        currentUser.followings.splice(id, 1);
        const newUser = await currentUser.save();

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