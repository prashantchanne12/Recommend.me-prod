import {

    SEND_UPVOTE_NOTIFICATION_REQUEST,
    SEND_UPVOTE_NOTIFICATION_SUCCESS,
    SEND_UPVOTE_NOTIFICATION_FAIL,
    SEND_UPVOTE_NOTIFICATION_RESET,

    REMOVE_UPVOTE_NOTIFICATION_REQUEST,
    REMOVE_UPVOTE_NOTIFICATION_SUCCESS,
    REMOVE_UPVOTE_NOTIFICATION_FAIL,
    REMOVE_UPVOTE_NOTIFICATION_RESET

} from '../constants/notificationConstants';

export const sendUpvoteNotificationReducer = (state = { loading: null, error: null, data: null }, action) => {

    switch (action.type) {

        case SEND_UPVOTE_NOTIFICATION_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case SEND_UPVOTE_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                loading: true,
                data: action.payload,
            }
        }

        case SEND_UPVOTE_NOTIFICATION_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case SEND_UPVOTE_NOTIFICATION_RESET: {
            return {
                loading: null,
                error: null,
                data: null
            }
        }

        default: return state;

    }

}

export const removeUpvoteNotificationReducer = (state = { loading: null, error: null, data: null }, action) => {

    switch (action.type) {

        case REMOVE_UPVOTE_NOTIFICATION_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case REMOVE_UPVOTE_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                loading: true,
                data: action.payload,
            }
        }

        case REMOVE_UPVOTE_NOTIFICATION_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case REMOVE_UPVOTE_NOTIFICATION_RESET: {
            return {
                loading: null,
                error: null,
                data: null
            }
        }

        default: return state;

    }

}