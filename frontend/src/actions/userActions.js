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

    USER_FOLLOW_REQUEST,
    USER_FOLLOW_SUCCESS,
    USER_FOLLOW_FAIL,

    USER_UNFOLLOW_REQUEST,
    USER_UNFOLLOW_SUCCESS,
    USER_UNFOLLOW_FAIL,
    USER_PROFILE_RESET,

    INBOX_TOGGLE_REQUEST,
    INBOX_TOGGLE_RESET,

    CHANGE_USERNAME_CARD_REQUEST,
    CHANGE_USERNAME_CARD_RESET,

    CHANGE_USERNAME_REQUEST,
    CHANGE_USERNAME_SUCCESS,
    CHANGE_USERNAME_FAIL,
    CHANGE_USERNAME_RESET,

    MY_NOTIFICATIONS_REQUEST,
    MY_NOTIFICATIONS_SUCCESS,
    MY_NOTIFICATIONS_FAIL,
    MY_NOTIFICATIONS_RESET,
    NOTIFICATION_TOGGLE_RESET,

} from '../constants/userConstants';

import { FETCH_MY_RECOMMEND_LIST_RESET } from '../constants/recommendConstants';
import { MY_TIMELINE_RESET } from '../constants/timelineConstants';
import { loadingStartAction, loadingEndAction } from '../actions/loadingActions';

import axios from 'axios';


export const mySession = () => async (dispatch) => {

    try {

        dispatch({
            type: MY_SESSION_REQUEST,
        });

        // const { data } = await axios.get('/api/user/currentUser');
        const { data } = await axios.get('/auth/currentUser');

        // localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch({
            type: MY_SESSION_SUCCESS,
            payload: data,
        });

        dispatch({
            type: 'MAKE_LOGOUT_FALSE',
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

export const myNotification = () => async (dispatch) => {

    try {

        dispatch({
            type: MY_NOTIFICATIONS_REQUEST,
        });

        const { data } = await axios.get('/api/notification');

        dispatch({
            type: MY_NOTIFICATIONS_SUCCESS,
            payload: data,
        });


    } catch (err) {
        dispatch({
            type: MY_NOTIFICATIONS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const profileToggle = () => async (dispatch) => {
    dispatch({
        type: USER_PROFILE_TOGGLE_REQUEST,
    });
    dispatch({
        type: NOTIFICATION_TOGGLE_RESET,
    });
}

export const inboxToggle = () => async (dispatch) => {
    dispatch({
        type: INBOX_TOGGLE_REQUEST,
    });
}

export const inboxToggleReset = () => async (dispatch) => {
    dispatch({
        type: INBOX_TOGGLE_RESET,
    });
}

export const profileToggleReset = () => async (dispatch) => {
    dispatch({
        type: USER_PROFILE_TOGGLE_RESET,
    });
}

export const changeUserNameCard = () => async (dispatch) => {

    dispatch({
        type: CHANGE_USERNAME_RESET,
    });

    dispatch({
        type: CHANGE_USERNAME_CARD_REQUEST,
    });
}

export const changeUserNameCardReset = () => async (dispatch) => {
    dispatch({
        type: CHANGE_USERNAME_CARD_RESET,
    });
}

export const changeUserName = (userName) => async (dispatch) => {

    try {
        dispatch({
            type: CHANGE_USERNAME_REQUEST,
        });

        // dispatch(loadingStartAction());

        const { data } = await axios.put(`/api/user/changeUserName/${userName}`);

        if (data) {
            dispatch(loadingEndAction());

            dispatch({
                type: CHANGE_USERNAME_SUCCESS,
                payload: data,
            });

            dispatch(mySession());

        } else {
            // dispatch(loadingEndAction());
        }


    } catch (err) {
        // dispatch(loadingEndAction());
        dispatch({
            type: CHANGE_USERNAME_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const userLogout = () => async (dispatch) => {

    try {

        dispatch({
            type: USER_LOGOUT_REQUEST,
        });
        dispatch(loadingStartAction());

        const { data } = await axios.get('/auth/logout');
        // localStorage.removeItem('userInfo');

        if (data) {
            dispatch(loadingEndAction());

            dispatch({
                type: MY_SESSION_RESET,
            });

            dispatch({
                type: FETCH_MY_RECOMMEND_LIST_RESET,
            });

            dispatch({
                type: MY_TIMELINE_RESET,
            });

            dispatch({
                type: USER_PROFILE_RESET,
            });

            dispatch({
                type: MY_NOTIFICATIONS_RESET,
            });

            dispatch({
                type: USER_LOGOUT_SUCCESS,
            });
        } else {
            dispatch(loadingEndAction());
        }


    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
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

export const followUser = (id) => async (dispatch) => {
    try {

        dispatch(loadingStartAction());

        dispatch({
            type: USER_FOLLOW_REQUEST
        });

        await axios.put(`/api/user/follow/${id}`);

        dispatch({
            type: USER_FOLLOW_SUCCESS
        });

        dispatch(userProfile(id));
        dispatch(loadingEndAction());
        dispatch(mySession());


    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: USER_FOLLOW_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const unfollowUser = (id) => async (dispatch) => {
    try {

        dispatch(loadingStartAction());

        dispatch({
            type: USER_UNFOLLOW_REQUEST
        });

        await axios.put(`/api/user/unfollow/${id}`);

        dispatch({
            type: USER_UNFOLLOW_SUCCESS
        });

        dispatch(userProfile(id));
        dispatch(loadingEndAction());
        dispatch(mySession());


    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: USER_UNFOLLOW_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}