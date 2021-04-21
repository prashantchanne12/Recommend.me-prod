import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import TwitterStrategy from 'passport-twitter';
import User from '../models/userModel.js';

// this is called after adding or fetching the user from Mongo and passed it into done(null, user) 
// this will take the user which is logged in and will make the cookie out of user._id
// Called only once
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Taking info out from the cookie i.e. userId
// Called everytime user hits endpoint
passport.deserializeUser(async (id, done) => {
    console.log('de-serializing');
    const user = await User.findById(id);
    if (user) {
        // this adds user to req.user everytime user requests endpoint 
        done(null, user);
    }
});

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback', // Callback URL after user grants permissions to the google
}, async (accessToken, refreshToken, profile, done) => {

    const user = await User.findOne({ userId: profile.id });

    if (user) {
        // we already have a record
        done(null, user);
    } else {
        // don't have a record, create a new one
        const newUser = await new User({
            userId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            loginMethod: 'Google',
        }).save();

        if (newUser) {
            done(null, newUser);
        }
    }

}));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_SECRET_KEY,
    callbackURL: '/auth/twitter/callback'
}, async (token, tokenSecret, profile, done) => {

    const user = await User.findOne({ userId: profile.id });

    if (user) {
        // we already have a record
        done(null, user);
    } else {
        // don't have a record, create a new one
        const newUser = await new User({
            userId: profile.id,
            displayName: profile.displayName,
            firstName: profile.displayName.split(' ')[0],
            lastName: profile.displayName.split(' ')[1],
            image: profile.photos[0].value,
            loginMethod: 'Twitter',
        }).save();

        if (newUser) {
            done(null, newUser);
        }
    }

}));
