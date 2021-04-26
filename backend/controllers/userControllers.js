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
    const userId = req.params.id;

    const followUser = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (followUser && currentUser) {

        // Add followUser id in current user's followings
        currentUser.followings = [...currentUser.followings, id];
        const newCurrentUser = await currentUser.save();

        // Add current user's id in followUser followers
        followUser.followers = [...followUser.followers, userId]
        const newFollowUser = await followUser.save();

        if (newCurrentUser && newFollowUser) {
            res.status(newCurrentUser);
        } else {
            res.status(500);
            throw new Error('Error while adding follower & followings!');
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
    const userId = req.params.id;

    const unfollowUser = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (unfollowUser && currentUser) {

        // Remove followUser id from the current user's followings
        currentUser.followings.splice(id, 1);
        const newCurrentUser = await currentUser.save();

        // Remove current user's id from the unfollowUser followers
        followUser.followers.splice(userId, 1)
        const newFollowUser = await followUser.save();

        if (newCurrentUser && newFollowUser) {
            res.status(newCurrentUser);
        } else {
            res.status(500);
            throw new Error('Error while removing follower & followings!');
        }

    } else {
        res.status(404);
        throw new Error('User not found!');
    }
});