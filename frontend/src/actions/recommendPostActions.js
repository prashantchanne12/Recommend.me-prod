import {

    FETCH_LIST_REQUEST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAIL,

} from '../constants/recommendPostConstants';

import { loadingStartAction, loadingEndAction } from './loadingActions';

import axios from 'axios';

export const getPost = (id) => async (dispatch) => {

    try {

        dispatch({
            type: FETCH_LIST_REQUEST
        });

        dispatch(loadingStartAction());

        const { data } = await axios.get(`/api/recommend/list/${id}`);

        dispatch({
            type: FETCH_LIST_SUCCESS,
            payload: data,
        });

        dispatch(loadingEndAction());

    } catch (err) {
        dispatch(loadingEndAction());
        dispatch({
            type: FETCH_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}