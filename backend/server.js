// Add "type": "module" in package.json to use ES Modules
import path from 'path';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


// Configuring environment variables with .dotenv
dotenv.config();

// Passport config
require('./config/passport')(passport);

// Connecting to MongoDB database
connectDB();

const app = express();

app.use(express.json());

// Sessions
app.use(session({
    secret: 'hdfhhw72379ohdna',
    resave: false, // don't save a session if nothing is modified
    saveUninitialized: false, // don't create a session until something is stored
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serving static files
const __dirname = path.resolve();


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend/build')))

//     app.get('*', (req, res, next) => {
//         res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
//     });

// } else {
//     app.get('/', (req, res, next) => {
//         res.send('API is running');
//     });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));