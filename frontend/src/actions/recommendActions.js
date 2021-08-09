import {
    ADD_RECOMMEND_LIST_REQUEST,
    ADD_RECOMMEND_LIST_SUCCESS,
    ADD_RECOMMEND_LIST_FAIL,

    FETCH_MY_RECOMMEND_LIST_REQUEST,
    FETCH_MY_RECOMMEND_LIST_SUCCESS,
    FETCH_MY_RECOMMEND_LIST_FAIL,

    FETCH_USER_RECOMMEND_LIST_REQUEST,
    FETCH_USER_RECOMMEND_LIST_SUCCESS,
    FETCH_USER_RECOMMEND_LIST_FAIL,


    UPVOTE_RECOMMEND_LIST_REQUEST,
    UPVOTE_RECOMMEND_LIST_SUCCESS,
    UPVOTE_RECOMMEND_LIST_FAIL,

    DOWNVOTE_RECOMMEND_LIST_REQUEST,
    DOWNVOTE_RECOMMEND_LIST_SUCCESS,
    DOWNVOTE_RECOMMEND_LIST_FAIL,

    SHARE_REQUEST,
    SHARE_RESET,

} from '../constants/recommendConstants';

import { mySession } from './userActions';
import { loadingStartAction, loadingEndAction } from './loadingActions';

import axios from 'axios';

export const addRecommendAction = (body) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_RECOMMEND_LIST_REQUEST
        });
        dispatch(loadingStartAction());

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            '/api/recommend/create',
            body,
            config,
        );

        dispatch({
            type: ADD_RECOMMEND_LIST_SUCCESS,
            payload: data,
        });

        dispatch(loadingEndAction());
        dispatch(mySession());

    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: ADD_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });

    }
}

export const fetchMyRecommendations = () => async (dispatch) => {

    try {
        dispatch({
            type: FETCH_MY_RECOMMEND_LIST_REQUEST,
        });
        dispatch(loadingStartAction());

        const { data } = await axios.get(`/api/recommend/lists`);

        dispatch({
            type: FETCH_MY_RECOMMEND_LIST_SUCCESS,
            payload: data,
        });
        dispatch(loadingEndAction());

    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: FETCH_MY_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        })
    }

}

export const fetchUserRecommendations = (id) => async (dispatch) => {

    try {

        dispatch({
            type: FETCH_USER_RECOMMEND_LIST_REQUEST
        });
        dispatch(loadingStartAction());

        const { data } = await axios.get(`/api/recommend/lists/u/${id}`);

        dispatch({
            type: FETCH_USER_RECOMMEND_LIST_SUCCESS,
            payload: data,
        });
        dispatch(loadingEndAction());

    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: FETCH_USER_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}

export const upvoteRecommendation = (id) => async (dispatch) => {

    // PUT /api/recommend/list/upvote/:id

    try {

        dispatch({
            type: UPVOTE_RECOMMEND_LIST_REQUEST
        });


        await axios.put(
            ` /api/recommend/list/upvote/${id}`,
        );

        dispatch({
            type: UPVOTE_RECOMMEND_LIST_SUCCESS,
            payload: {
                upvote: true,
                downvote: false,
            },
        });

    } catch (err) {
        dispatch({
            type: UPVOTE_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}
export const removeUpvoteRecommendation = (id) => async (dispatch) => {

    // PUT /api/recommend/list/upvote/:id

    try {

        dispatch({
            type: DOWNVOTE_RECOMMEND_LIST_REQUEST
        });


        await axios.put(
            ` /api/recommend/list/removeUpvote/${id}`,
        );

        dispatch({
            type: DOWNVOTE_RECOMMEND_LIST_SUCCESS,
            payload: {
                downvote: true,
                upvote: false
            },
        });

    } catch (err) {
        dispatch({
            type: DOWNVOTE_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}


export const shareAction = (url) => async (dispatch) => {

    dispatch({
        type: SHARE_REQUEST,
        payload: url,
    });
}

export const shareResetAction = () => async (dispatch) => {

    dispatch({
        type: SHARE_RESET,
    });
}