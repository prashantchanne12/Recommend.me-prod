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
    USER_PROFILE_RESET,


    USER_FOLLOW_REQUEST,
    USER_FOLLOW_SUCCESS,
    USER_FOLLOW_FAIL,

    USER_UNFOLLOW_REQUEST,
    USER_UNFOLLOW_SUCCESS,
    USER_UNFOLLOW_FAIL,

    INBOX_TOGGLE_REQUEST,
    INBOX_TOGGLE_RESET,


} from '../constants/userConstants';

const INIT_STATE = {
    user: null,
    error: null,
    loading: null,
}

export const mySessionReducer = (state = INIT_STATE, action) => {

    switch (action.type) {


        case MY_SESSION_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case MY_SESSION_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        }

        case MY_SESSION_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case MY_SESSION_RESET: {
            return { user: null }
        }

        default: return state;

    }

}

export const profileToggleReducer = (state = { toggle: null }, action) => {

    switch (action.type) {


        case USER_PROFILE_TOGGLE_REQUEST: {
            return {
                ...state,
                toggle: true
            }
        }

        case USER_PROFILE_TOGGLE_RESET: {
            return {
                ...state,
                toggle: false
            }
        }

        default: return state;

    }

}

export const inboxToggleReducer = (state = { toggle: null }, action) => {

    switch (action.type) {


        case INBOX_TOGGLE_REQUEST: {
            return {
                ...state,
                toggle: true
            }
        }

        case INBOX_TOGGLE_RESET: {
            return {
                ...state,
                toggle: false
            }
        }

        default: return state;

    }

}

export const userLogoutReducer = (state = { error: null, loading: null }, action) => {

    switch (action.type) {

        case USER_LOGOUT_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case USER_LOGOUT_SUCCESS: {
            return {
                ...state,
                error: null,
                loading: null,
            }
        }

        case USER_LOGOUT_FAIL: {
            return {
                ...state,
                error: action.payload,
                loading: null,
            }
        }

        default: return state;
    }

}

export const userProfileReducer = (state = { loading: null, user: null, error: null }, action) => {

    switch (action.type) {

        case USER_PROFILE_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case USER_PROFILE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload,
            }
        }

        case USER_PROFILE_FAIL: {
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
            }
        }

        case USER_PROFILE_RESET: {
            return { loading: null, user: null, error: null };

        }

        default: return state;
    }

}

export const followUserReducer = (state = { error: null, loading: null }, action) => {

    switch (action.type) {

        case USER_FOLLOW_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case USER_FOLLOW_SUCCESS: {
            return {
                ...state,
                loading: false,
            }
        }

        case USER_FOLLOW_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        default: return state;
    }

}

export const unfollowUserReducer = (state = { error: null, loading: null }, action) => {

    switch (action.type) {

        case USER_UNFOLLOW_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case USER_UNFOLLOW_SUCCESS: {
            return {
                ...state,
                loading: false,
            }
        }

        case USER_UNFOLLOW_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        default: return state;
    }

}