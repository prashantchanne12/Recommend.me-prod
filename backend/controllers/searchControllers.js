import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc POST search profile
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

    // allUsers = allUsers.filter(user => user._id != req.user._id);
    res.send(allUsers);

});

