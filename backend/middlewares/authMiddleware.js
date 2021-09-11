import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    // PRODUCTION
    if (!req.user) {
        res.status(401);
        throw new Error('Not Auhtorized');
    }
    // POSTMAN TESTING
    // const user = await User.findById('610d58036553ee50706ee7ad');
    // req.user = user;

    next();

});