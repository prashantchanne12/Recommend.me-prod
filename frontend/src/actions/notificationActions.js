import {

    SEND_UPVOTE_NOTIFICATION_REQUEST,
    SEND_UPVOTE_NOTIFICATION_SUCCESS,
    SEND_UPVOTE_NOTIFICATION_FAIL

} from '../constants/notificationConstants'

import axios from 'axios'

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