import axios from 'axios';
// import {

//     ADD_COMMENT_REQUEST,
//     ADD_COMMENT_SUCESSS,
//     ADD_COMMENT_FAIL,

//     ADD_REPLY_REQUEST,
//     ADD_REPLY_SUCESSS,
//     ADD_REPLY_FAIL,

//     FETCH_COMMENT_REQUEST,
//     FETCH_COMMENT_SUCESSS,
//     FETCH_COMMENT_FAIL,

// } from '../constants/commentConstants';

export const addCommentAction = (body) => async (dispatch, getState) => {

    try {

        dispatch({
            type: 'ADD_COMMENT_REQUEST'
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const state = getState();

        const { data } = await axios.post(
            `/api/comments/create`,
            body,
            config
        );

        state.singlePost.post.comments.unshift(data);
        // state.singlePost.post.comments.unshift(data._id);
        const payload = state.singlePost.post;

        dispatch({
            type: 'FETCH_SINGLE_COMMENT',
            payload,
        });

        dispatch({
            type: 'ADD_COMMENT_SUCESSS',
            payload: data
        });

    } catch (err) {
        dispatch({
            type: 'ADD_COMMENT_FAIL',
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}

export const deleteCommentAction = ({ commentId, level }) => async (dispatch, getState) => {

    try {

        dispatch({
            type: 'DELETE_COMMENT_REQUEST',
            payload: commentId,
        });

        const state = getState();

        const { data } = await axios.delete(`/api/comments/delete/${commentId}`);

        const findComment = (comment, index, array) => {

            if (comment._id === commentId) {

                if (comment.replies.length > 0) {
                    comment.deleted = true
                } else {
                    array.splice(index, 1);
                }

                return

            }

            comment.replies.forEach((com, index, array) => {
                findComment(com, index, array);
            });

        }

        findComment(state.singlePost.post.comments[level], level, state.singlePost.post.comments);

        const payload = state.singlePost.post;

        dispatch({
            type: 'FETCH_SINGLE_COMMENT',
            payload,
        });

        dispatch({
            type: 'DELETE_COMMENT_SUCESSS',
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: 'DELETE_COMMENT_FAIL',
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }
}



export const addReplyCommentAction = ({ body, commentId, level }) => async (dispatch, getState) => {

    try {

        dispatch({
            type: 'ADD_REPLY_REQUEST'
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const state = getState();

        const { data } = await axios.put(
            `/api/comments/reply`,
            {
                body,
                commentId,
            },
            config
        );

        // state.singlePost.post.comments.unshift(data);
        // // state.singlePost.post.comments.unshift(data._id);
        // const payload = state.singlePost.post;



        const findComment = (comment) => {

            if (comment._id === commentId) {
                comment.replies.unshift(data);
                return
            }

            if (comment.replies.length === 0) {
                return
            }

            comment.replies.forEach(com => {
                findComment(com);
            })

        }

        findComment(state.singlePost.post.comments[level]);

        const payload = state.singlePost.post;

        dispatch({
            type: 'FETCH_SINGLE_REPLY',
            payload,
        });

        dispatch({
            type: 'ADD_REPLY_SUCESSS',
            payload: data
        });

    } catch (err) {
        dispatch({
            type: 'ADD_REPLY_FAIL',
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}


export const fetchCommentAction = (id) => async (dispatch) => {

    try {

        dispatch({
            type: 'FETCH_COMMENT_REQUEST'
        });

        const { data } = await axios.get(`/api/comments/getComment/${id}`);

        dispatch({
            type: 'FETCH_COMMENT_SUCESSS',
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: 'FETCH_COMMENT_FAIL',
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}

export const commentBoxIdAction = (id) => async (dispatch) => {
    dispatch({
        type: 'ADD_COMMENT_ID',
        payload: id
    });
}
