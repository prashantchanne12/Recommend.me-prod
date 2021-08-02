import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    // PRODUCTION
    // if (!req.user) {
    //     res.status(401);
    //     throw new Error('Not Auhtorized');
    // }
    // POSTMAN TESTING
    const user = await User.findById('61081c2cfc0e014298512433');
    req.user = user;

    next();

});