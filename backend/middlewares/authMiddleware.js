import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    // PRODUCTION
    // if (!req.user) {
    //     res.status(401);
    //     throw new Error('Not Auhtorized');
    // }

    // POSTMAN TESTING
    const user = await User.findById('608665aaef1be0753483d7cc');

    req.user = user;

    next();

});