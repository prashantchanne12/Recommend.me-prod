import express from 'express';
import { accessChat, fetchChats } from '../controllers/chatControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const chatRouter = express.Router();

chatRouter.get('/', protect, fetchChats);
chatRouter.post('/', protect, accessChat);

export default chatRouter;
