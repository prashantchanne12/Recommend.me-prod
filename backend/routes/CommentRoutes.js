import express from 'express';
import { createComment, createReply } from '../controllers/commentControllers.js';
const commentsRouter = express.Router();
import { protect } from '../middlewares/authMiddleware.js';

// Controllers
// @route /api/comments/

commentsRouter.post('/create', protect, createComment);
commentsRouter.put('/reply', protect, createReply);

export default commentsRouter;