import express from 'express';
const recommendListRouter = express.Router();
import { protect } from '../middlewares/authMiddleware.js';

// Controllers
// @route /api/recommend/

import {
    addRecommendListToBucket,
    createRecommendList,
    deleteRecommendList,
    deleteRecommendListFromBucket,
    getRecommendationList,
    getUsersRecommendationLists,
    getUsersRecommendationListsById,
    removeUpvoteFromRecommendationList,
    upvoteRecommendationList,
} from '../controllers/recommendListControllers.js';

recommendListRouter.post('/create', protect, createRecommendList);
recommendListRouter.get('/list/:id', getRecommendationList);
recommendListRouter.get('/lists', getUsersRecommendationLists);
recommendListRouter.get('/lists/u/:id', getUsersRecommendationListsById);
recommendListRouter.put('/list/upvote/:id', protect, upvoteRecommendationList);
recommendListRouter.put('/list/removeUpvote/:id', protect, removeUpvoteFromRecommendationList);
recommendListRouter.put('/list/bucket/:id', protect, addRecommendListToBucket);
recommendListRouter.delete('/list/bucket/:id', protect, deleteRecommendListFromBucket);
recommendListRouter.delete('/list/delete/:id', protect, deleteRecommendList);




export default recommendListRouter;