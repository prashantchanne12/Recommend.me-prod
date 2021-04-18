import express from 'express';
import passport from 'passport';
const authRouter = express.Router();

// @desc Google authentication
// @route GET /auth/google
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// @desc Google authentication callback
// @route GET /auth/google/callback
authRouter.get('/google/callback', passport.authenticate('google'));

export default authRouter;