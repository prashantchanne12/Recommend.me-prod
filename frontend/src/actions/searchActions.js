import {

    SEARCH_PROFILE_REQUEST,
    SEARCH_PROFILE_SUCCESS,
    SEARCH_PROFILE_FAIL,

} from '../constants/searchConstants';

import axios from 'axios';

export const searchUser = (body) => async (dispatch) => {

    try {

        dispatch({
            type: SEARCH_PROFILE_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            '/api/search/profile',
            body,
            config,
        );

        dispatch({
            type: SEARCH_PROFILE_SUCCESS,
            payload: data,
        });


    } catch (err) {
        dispatch({
            type: SEARCH_PROFILE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }

}