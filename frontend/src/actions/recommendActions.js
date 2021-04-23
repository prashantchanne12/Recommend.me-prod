import {
    ADD_RECOMMEND_LIST_REQUEST,
    ADD_RECOMMEND_LIST_SUCCESS,
    ADD_RECOMMEND_LIST_FAIL,

    FETCH_PROFILE_RECOMMEND_LIST_REQUEST,
    FETCH_PROFILE_RECOMMEND_LIST_SUCCESS,
    FETCH_PROFILE_RECOMMEND_LIST_FAIL,
    FETCH_PROFILE_RECOMMEND_LIST_RESET,

} from '../constants/recommendConstants';

import { userSession } from './userActions';
import axios from 'axios';

export const addRecommendAction = (body) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_RECOMMEND_LIST_REQUEST
        });

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

        dispatch(userSession());

    } catch (err) {
        dispatch({
            type: ADD_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });

    }
}

export const fetchRecommendation = (id) => async (dispatch) => {

    try {
        dispatch({
            type: FETCH_PROFILE_RECOMMEND_LIST_REQUEST,
        });

        const { data } = await axios.get(`/api/recommend/${id}`);

        dispatch({
            type: FETCH_PROFILE_RECOMMEND_LIST_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: FETCH_PROFILE_RECOMMEND_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        })
    }

}