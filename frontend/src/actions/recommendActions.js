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

    DELETE_RECOMMEND_LIST_REQUEST,
    DELETE_RECOMMEND_LIST_SUCCESS,
    DELETE_RECOMMEND_LIST_FAIL,

} from '../constants/recommendConstants';

import { mySession } from './userActions';
import { loadingStartAction, loadingEndAction } from './loadingActions';

import axios from 'axios';
import { removeUpvoteNotification, sendUpvoteNotification } from './notificationActions';
import { WARNING_CARD_RESET } from '../constants/warningConstants';

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

export const deleteMyRecommendation = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: DELETE_RECOMMEND_LIST_REQUEST });
        dispatch(loadingStartAction());


        const { data } = await axios.delete(`/api/recommend/list/delete/${id}`);
        const state = getState();

        state.myRecommendations.lists.uploadedRecommendations =
            state.myRecommendations.lists.uploadedRecommendations.filter(item => {
                if (item) {
                    if (item._id !== id) {
                        return true;
                    }
                }
                return false;
            });

        dispatch({
            type: DELETE_RECOMMEND_LIST_SUCCESS,
            payload: data
        });

        dispatch(loadingEndAction());



        dispatch({
            type: 'GO_TO_PROFILE'
        });

        dispatch({
            type: WARNING_CARD_RESET,
        });

    } catch (err) {
        dispatch({
            type: DELETE_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
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

export const upvoteRecommendation = (id, body, isMyPost) => async (dispatch) => {

    // PUT /api/recommend/list/upvote/:id

    try {

        dispatch({
            type: UPVOTE_RECOMMEND_LIST_REQUEST
        });

        await axios.put(
            ` /api/recommend/list/upvote/${id}`,
        );

        if (!isMyPost) { dispatch(sendUpvoteNotification(body)); }

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
export const removeUpvoteRecommendation = (id, body) => async (dispatch) => {

    // PUT /api/recommend/list/upvote/:id

    try {

        dispatch({
            type: DOWNVOTE_RECOMMEND_LIST_REQUEST
        });


        await axios.put(
            ` /api/recommend/list/removeUpvote/${id}`,
        );

        dispatch(removeUpvoteNotification(body));

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