import asyncHandlers from 'express-async-handler';
import RecommendList from '../models/recommendListModel.js';


// @desc Add recommendation list in database
// @route POST /api/recommend/create
export const createRecommendList = asyncHandlers(async (req, res) => {
    const { data, tags } = req.body;

    console.log(req.user);

    const recommendList = await new RecommendList({
        data,
        owner: req.user._id,
        tags,
    }).save();

    if (recommendList) {
        res.status(200).send(recommendList);
    } else {
        res.status(500);
        throw new Error('Error while adding list');
    }
});