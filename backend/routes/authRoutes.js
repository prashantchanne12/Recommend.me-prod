import express from 'express';
import passport from 'passport';
import { protect } from '../middlewares/authMiddleware.js';
import { redirect } from '../utils/redirect.js';
const authRouter = express.Router();

// @desc Google authentication
// @route GET auth/google
authRouter.get('/google',
    redirect,
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }));

// @desc Google authentication callback
// @route GET auth/google/callback
authRouter.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        if (req.session.redirectUrl !== 'undefined') {
            res.redirect(`/${req.session.redirectUrl}`);
        } else {
            res.redirect('/');
        }

    }
);

// @desc Twitter authentication
// @route GET auth/twitter
authRouter.get('/twitter', passport.authenticate('twitter'));

// @desc Twitter authentication callback
// @route GET auth/twitter/callback
authRouter.get(
    '/twitter/callback',
    passport.authenticate('twitter'),
    (req, res) => {
        res.redirect('/');
    }
);

// @desc Current logged in user
// @route GET auth/currentUser
authRouter.get('/currentUser', (req, res) => {
    if (!req.user) {
        res.status(404);
        throw new Error('User not found!');
    } else {
        res.send(req.user);
    }
});

// @desc Log out user
// @route GET auth/logout
authRouter.get('/logout', (req, res) => {
    req.logout();
    delete req.user;
    delete req.session;
    req.session = null;
    req.user = null;
    res.send('Logged out');

});

export default authRouter;