import asyncHandlers from 'express-async-handler';
import RecommendList from '../models/recommendListModel.js';
import Comment from '../models/CommentModel.js';

// @desc Create comment
// @route POST /api/comments/create
export const createComment = asyncHandlers(async (req, res) => {
    const { body, id } = req.body;

    let comment = await new Comment({
        body,
        from: req.user._id,
    }).save();

    if (comment) {

        const recommendList = await RecommendList.findById(id);

        if (recommendList) {

            recommendList.comments.unshift(comment._id);
            await recommendList.save();


            res.send({
                ...comment._doc,
                from: {
                    userName: req.user.userName,
                    image: req.user.image,
                    displayName: req.user.displayName,
                }

            });

        } else {
            res.status(404);
            throw new Error('Recommend list not found!');
        }
    } else {
        res.status(500);
        throw new Error('Error while creating comment!');
    }


});



// @desc Reply a comment
// @route PUT /api/comments/reply
export const createReply = asyncHandlers(async (req, res) => {

    const { body, commentId } = req.body;

    const comment = await new Comment({
        body,
        from: req.user._id,
    }).save();

    if (comment) {

        const parentComment = await Comment.findById(commentId);

        if (parentComment) {

            parentComment.replies.unshift(comment._id);
            await parentComment.save();
            res.send({
                ...comment._doc,
                from: {
                    userName: req.user.userName,
                    image: req.user.image,
                    displayName: req.user.displayName,
                }

            });

        } else {
            res.status(404);
            throw new Error('Comment not found!');
        }
    } else {
        res.status(500);
        throw new Error('Error while adding reply!');
    }

});


// @desc Get a comment
// @route PUT /api/comments/getComment/:id
export const getComment = asyncHandlers(async (req, res) => {

    const id = req.params.id;

    const comment = await Comment.findById(id);

    if (comment) {

        res.send(comment)

    } else {
        res.status(500);
        throw new Error('Error while getting a comment!');
    }

});


