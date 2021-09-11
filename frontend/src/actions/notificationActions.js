import {

    SEND_UPVOTE_NOTIFICATION_REQUEST,
    SEND_UPVOTE_NOTIFICATION_SUCCESS,
    SEND_UPVOTE_NOTIFICATION_FAIL,

    REMOVE_UPVOTE_NOTIFICATION_REQUEST,
    REMOVE_UPVOTE_NOTIFICATION_SUCCESS,
    REMOVE_UPVOTE_NOTIFICATION_FAIL,

    READ_ALL_NOTIFICATION_REQUEST,
    READ_ALL_NOTIFICATION_SUCCESS,
    READ_ALL_NOTIFICATION_FAIL,

    SEND_FOLLOW_NOTIFICATION_REQUEST,
    SEND_FOLLOW_NOTIFICATION_SUCCESS,
    SEND_FOLLOW_NOTIFICATION_FAIL,

} from '../constants/notificationConstants'

import axios from 'axios';
import { myNotification } from './userActions';

export const sendUpvoteNotification = (body) => async (dispatch) => {

    try {

        dispatch({
            type: SEND_UPVOTE_NOTIFICATION_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            '/api/notification/upvote',
            body,
            config
        );

        dispatch({
            type: SEND_UPVOTE_NOTIFICATION_SUCCESS,
            payload: data
        });


    } catch (err) {
        dispatch({
            type: SEND_UPVOTE_NOTIFICATION_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }

}

export const sendFollowNotification = (body) => async (dispatch) => {

    try {

        dispatch({
            type: SEND_FOLLOW_NOTIFICATION_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            '/api/notification/follow',
            body,
            config
        );

        dispatch({
            type: SEND_FOLLOW_NOTIFICATION_SUCCESS,
            payload: data
        });


    } catch (err) {
        dispatch({
            type: SEND_FOLLOW_NOTIFICATION_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }

}

export const removeUpvoteNotification = (body) => async (dispatch) => {

    try {

        dispatch({
            type: REMOVE_UPVOTE_NOTIFICATION_REQUEST,
        });


        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.put(
            `/api/notification/remove/upvote`,
            body,
            config
        );

        dispatch({
            type: REMOVE_UPVOTE_NOTIFICATION_SUCCESS,
            payload: data
        });


    } catch (err) {
        dispatch({
            type: REMOVE_UPVOTE_NOTIFICATION_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }

}

export const readAllNotifications = () => async (dispatch) => {


    try {

        dispatch({
            type: READ_ALL_NOTIFICATION_REQUEST,
        });


        const { data } = await axios.put(
            `/api/notification/readAll`,
        );

        dispatch({
            type: READ_ALL_NOTIFICATION_SUCCESS,
            payload: data,
        });

        dispatch(myNotification());


    } catch (err) {
        dispatch({
            type: READ_ALL_NOTIFICATION_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }

}