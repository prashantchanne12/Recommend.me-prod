// Add "type": "module" in package.json to use ES Modules
import path from 'path';
import express from 'express';
// passport middleware
import './services/passport.js';
import passport from 'passport';
import coockieSession from 'cookie-session';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routers
import authRouter from './routes/authRoutes.js';
import recommendListRouter from './routes/recommendListRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Middlewares
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

// Configuring environment variables with .dotenv
dotenv.config();

// Connecting to MongoDB database
connectDB();

const app = express();

// parse json data
app.use(express.json());

app.use(coockieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

// To tell passport make use of cookies
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);
app.use('/api/recommend', recommendListRouter);
app.use('/api/user', userRoutes);

// import './streams/feed.js';

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

// Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));