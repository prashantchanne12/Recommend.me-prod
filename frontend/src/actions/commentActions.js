import axios from 'axios';
import {

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCESSS,
    ADD_COMMENT_FAIL,

    FETCH_COMMENT_REQUEST,
    FETCH_COMMENT_SUCESSS,
    FETCH_COMMENT_FAIL,


} from '../constants/commentConstants';

export const addCommentAction = (body) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ADD_COMMENT_REQUEST
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

        state.singlePost.post.comments.push(data);
        const payload = state.singlePost.post;

        dispatch({
            type: 'FETCH_SINGLE_COMMENT',
            payload,
        });

        dispatch({
            type: ADD_COMMENT_SUCESSS,
            payload: data
        });

    } catch (err) {
        dispatch({
            type: ADD_COMMENT_FAIL,
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
            type: FETCH_COMMENT_REQUEST
        });

        const { data } = await axios.get(`/api/comments/getComment/${id}`);

        dispatch({
            type: FETCH_COMMENT_SUCESSS,
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: FETCH_COMMENT_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}

