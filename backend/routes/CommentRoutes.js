import express from 'express';
import { createComment, createReply, deleteComment, getComment } from '../controllers/commentControllers.js';
const commentsRouter = express.Router();
import { protect } from '../middlewares/authMiddleware.js';

// Controllers
// @route /api/comments/

commentsRouter.post('/create', protect, createComment);
commentsRouter.put('/reply', protect, createReply);
commentsRouter.get('/getComment/:id', protect, getComment);
commentsRouter.delete('/delete', protect, deleteComment);

export default commentsRouter;