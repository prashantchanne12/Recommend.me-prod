import express from 'express';
import { allMessages, sendMessage } from '../controllers/messageControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const messageRouter = express.Router();

messageRouter.post('/', protect, sendMessage);
messageRouter.get('/:chatId', protect, allMessages);

export default messageRouter;
