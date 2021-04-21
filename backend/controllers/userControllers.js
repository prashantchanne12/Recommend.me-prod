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