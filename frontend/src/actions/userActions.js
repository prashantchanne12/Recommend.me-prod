import {

    USER_SESSION_REQUEST,
    USER_SESSION_SUCCESS,
    USER_SESSION_FAIL,

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