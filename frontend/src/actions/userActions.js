import {

    USER_SESSION_REQUEST,
    USER_SESSION_SUCCESS,
    USER_SESSION_FAIL,
    USER_SESSION_RESET,

    USER_PROFILE_TOGGLE_REQUEST,
    USER_PROFILE_TOGGLE_RESET,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,

} from '../constants/userConstants';

import { FETCH_USERS_RECOMMEND_LIST_RESET } from '../constants/recommendConstants';

import axios from 'axios';


export const userSession = () => async (dispatch) => {

    try {

        dispatch({
            type: USER_SESSION_REQUEST,
        });

        const { data } = await axios.get('/api/user/profile');

        localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch({
            type: USER_SESSION_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: USER_SESSION_FAIL,
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
            type: USER_SESSION_RESET,
        });

        dispatch({
            type: FETCH_USERS_RECOMMEND_LIST_RESET,
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

const userProfile = (id) => async (dispatch) => {

    dispatch({
        type: USER_PROFILE_REQUEST
    });



}