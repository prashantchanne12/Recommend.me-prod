import {

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,

} from '../constants/userConstants';
import axios from 'axios';

export const userProfile = () => async (dispatch) => {

    try {

        dispatch({
            type: USER_PROFILE_REQUEST,
        });

        const { data } = await axios.get('/api/user/profile');

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
        })
    }

}