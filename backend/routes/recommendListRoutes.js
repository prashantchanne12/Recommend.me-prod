import express from 'express';
const recommendListRouter = express.Router();
import { protect } from '../middlewares/authMiddleware.js';

// Controllers
import { createRecommendList, getRecommendationList } from '../controllers/recommendListControllers.js';

recommendListRouter.post('/create', protect, createRecommendList);
recommendListRouter.get('/:id', protect, getRecommendationList);

export default recommendListRouter;