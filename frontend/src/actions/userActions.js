import {

    MY_SESSION_REQUEST,
    MY_SESSION_SUCCESS,
    MY_SESSION_FAIL,
    MY_SESSION_RESET,

    USER_PROFILE_TOGGLE_REQUEST,
    USER_PROFILE_TOGGLE_RESET,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,

} from '../constants/userConstants';

import { FETCH_MY_RECOMMEND_LIST_RESET } from '../constants/recommendConstants';

import axios from 'axios';


export const mySession = () => async (dispatch) => {

    try {

        dispatch({
            type: MY_SESSION_REQUEST,
        });

        const { data } = await axios.get('/api/user/profile');

        localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch({
            type: MY_SESSION_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: MY_SESSION_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }

}

export const userProfileToggle = () => async (dispatch) => {
    dispatch({
        type: USER_PROFILE_TOGGLE_REQUEST,
    });
}

export const userProfileToggleReset = () => async (dispatch) => {
    dispatch({
        type: USER_PROFILE_TOGGLE_RESET,
    });
}

export const userLogout = () => async (dispatch) => {

    try {

        dispatch({
            type: USER_LOGOUT_REQUEST,
        });

        await axios.get('/auth/logout');
        localStorage.removeItem('userInfo');

        dispatch({
            type: MY_SESSION_RESET,
        });

        dispatch({
            type: FETCH_MY_RECOMMEND_LIST_RESET,
        })

        dispatch({
            type: USER_LOGOUT_SUCCESS,
        });

    } catch (err) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const userProfile = (id) => async (dispatch) => {

    try {

        dispatch({
            type: USER_PROFILE_REQUEST
        });

        const { data } = await axios.get(`/api/user/profile/u/${id}`);

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data,
        });

    } catch (err) {

        dispatch({
            type: USER_PROFILE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });

    }


}