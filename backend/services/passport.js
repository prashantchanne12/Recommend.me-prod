import dotenv from 'dotenv';
import e from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';

passport.serializeUser((user, done) => {
    done(null, user._id);
});

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback', // Callback URL after user grants permissions to the google
}, async (accessToken, refreshToken, profile, done) => {

    const user = await User.findOne({ googleId: profile.id });

    if (user) {
        // we already have a record
        done(null, user);
    } else {
        // don't have a record, create a new one
        const newUser = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
        }).save();

        if (newUser) {
            done(null, newUser);
        }
    }

}));
