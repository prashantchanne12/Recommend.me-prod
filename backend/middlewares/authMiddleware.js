import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {

    const user = await User.findById('607c4e674597e65634cbcc82');
    console.log(user);

    req.user = user;

    next();

});