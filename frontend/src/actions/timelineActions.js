import {

    MY_TIMELINE_REQUEST,
    MY_TIMELINE_SUCCESS,
    MY_TIMELINE_FAIL,

} from '../constants/timelineConstants';

import { loadingStartAction, loadingEndAction } from '../actions/loadingActions';

import axios from 'axios';

export const myTimeline = () => async (dispatch) => {

    try {

        dispatch(loadingStartAction());

        dispatch({
            type: MY_TIMELINE_REQUEST
        });

        const { data } = await axios.get(`/api/timeline`);

        dispatch(loadingEndAction());

        dispatch({
            type: MY_TIMELINE_SUCCESS,
            payload: data,
        });


    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: MY_TIMELINE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }

}