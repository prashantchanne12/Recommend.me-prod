// Add "type": "module" in package.json to use ES Modules
import path from 'path';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

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
import searchRoutes from './routes/searchRoutes.js';

// Middlewares
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import timelineRoutes from './routes/timelineRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { redirect } from './middlewares/redirect.js';
import commentsRouter from './routes/CommentRoutes.js';
import chatRouter from './routes/chatRouter.js';
import messageRouter from './routes/messageRoutes.js';

// Configuring environment variables with .dotenv
dotenv.config();

// Connecting to MongoDB database
connectDB();

const app = express();

// parse json data
app.use(express.json());

app.use(
  coockieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

// To tell passport make use of cookies
app.use(passport.initialize());
app.use(passport.session());

// Forcing https
app.use(redirect);

// Serving static files
const __dirname = path.resolve();

// cors
app.use(cors({ origin: '*' }));

// Routes
app.use('/auth', authRouter);
app.use('/api/recommend', recommendListRouter);
app.use('/api/user', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/comments', commentsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

// Widgets
app.get('/widgetJs', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend', 'docs', 'index.js'));
});
app.get('/widgetCss', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend', 'docs', 'index.css'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res, next) => {
    res.send('API is running');
  });
}

// Middlewares
app.get('/google37eb144521711fe3.html', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'frontend', 'build', 'google37eb144521711fe3.html')
  );
});
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room ${data}`);
  });

  socket.on('send_message', (data) => {
    // console.log('On server', data);
    socket.to(data.chat).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED ' + socket.id);
  });
});

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
