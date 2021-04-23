import express from 'express';
const recommendListRouter = express.Router();
import { protect } from '../middlewares/authMiddleware.js';

// Controllers
import {
    createRecommendList,
    getRecommendationList,
    getUsersRecommendationLists,
} from '../controllers/recommendListControllers.js';

recommendListRouter.post('/create', protect, createRecommendList);
recommendListRouter.get('/list/:id', protect, getRecommendationList);
recommendListRouter.get('/lists', protect, getUsersRecommendationLists);


export default recommendListRouter;