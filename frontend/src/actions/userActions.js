import {

    USER_SESSION_REQUEST,
    USER_SESSION_SUCCESS,
    USER_SESSION_FAIL,

    USER_PROFILE_TOGGLE_REQUEST,
    USER_PROFILE_TOGGLE_RESET,

} from '../constants/userConstants';
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