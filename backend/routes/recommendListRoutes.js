import express from 'express';
const recommendListRouter = express.Router();
import { protect } from '../middlewares/authMiddleware.js';

// Controllers
import { createRecommendList } from '../controllers/recommendListControllers.js';

recommendListRouter.post('/create', protect, createRecommendList);


export default recommendListRouter;