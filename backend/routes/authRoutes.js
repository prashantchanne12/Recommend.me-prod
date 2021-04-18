import express from 'express';
import passport from 'passport';
const authRouter = express.Router();

// @desc Google authentication
// @route GET auth/google
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// @desc Google authentication callback
// @route GET auth/google/callback
authRouter.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');
    }
);

// @desc Current logged in user
// @route GET auth/currentUser
authRouter.get('/currentUser', (req, res) => {
    res.send(req.user);
});

// @desc Log out user
// @route GET auth/logout
authRouter.get('/logout', (req, res) => {
    req.logOut();
    res.send(req.user);
});

export default authRouter;