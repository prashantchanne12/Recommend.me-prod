// Add "type": "module" in package.json to use ES Modules
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Configuring environment variables with .dotenv
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

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