import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc Get search profile
// @route /api/search/profile/:id
// @access Private
export const searchUserProfile = asyncHandler(async (req, res) => {
    const query = req.body.query;

    const allUsers = await User.find({
        displayName: {
            $regex: query,
            $options: 'i'
        }
    });

    res.send(allUsers);

});

