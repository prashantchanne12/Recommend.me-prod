import express from 'express';
const recommendListRouter = express.Router();

// Controllers
import { createRecommendList } from '../controllers/recommendListControllers.js';

recommendListRouter.post('/create', createRecommendList);


export default recommendListRouter;