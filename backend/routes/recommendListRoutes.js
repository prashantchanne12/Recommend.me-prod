import express from 'express';
const recommendListRouter = express.Router();
import { protect } from '../middlewares/authMiddleware.js';

// Controllers
// @route /api/recommend/

import {
    addRecommendListToBucket,
    createRecommendList,
    getRecommendationList,
    getUsersRecommendationLists,
    upvoteRecommendationList,
} from '../controllers/recommendListControllers.js';

recommendListRouter.post('/create', protect, createRecommendList);
recommendListRouter.get('/list/:id', protect, getRecommendationList);
recommendListRouter.get('/lists', protect, getUsersRecommendationLists);
recommendListRouter.put('/list/upvote/:id', protect, upvoteRecommendationList);
recommendListRouter.put('/list/bucket/:id', protect, addRecommendListToBucket);


export default recommendListRouter;