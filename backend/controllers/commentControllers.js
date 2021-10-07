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
        postId: id,
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
        parentCommentId: commentId,
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

// @desc Delete a comment
// @route DELETE /api/comments/delete/:id
export const deleteComment = asyncHandlers(async (req, res) => {

    const id = req.params.id;

    const comment = await Comment.findById(id);
    const parentCommentId = comment.parentCommentId;
    const postId = comment.postId;


    if (postId) {

        // This is root comment

        // does this comment has replies?
        if (comment.replies.length > 0) {

            comment.deleted = true;
            await comment.save();

        } else {

            await Comment.findByIdAndRemove(id);

            const recommendList = await RecommendList.findById(postId);
            recommendList.comments = recommendList.comments.filter(commentId => commentId !== id);
            recommendList.save();

        }

        res.send('Deleted');

    } else if (parentCommentId) {

        // This is reply comment

        if (comment.replies.length > 0) {
            comment.deleted = true;
            await comment.save();
        } else {

            const parentComment = await Comment.findById(parentCommentId);
            const index = parentComment.replies.findIndex(replyId => replyId === id);
            parentComment.replies.splice(index, 1);

            if (parentComment.replies.length === 0 && parentComment.deleted) {
                await Comment.findByIdAndRemove(parentCommentId);
            } else {
                await parentComment.save();
            }

        }

        res.send('Deleted');

    }

});

