import {

    USER_SESSION_REQUEST,
    USER_SESSION_SUCCESS,
    USER_SESSION_FAIL,
    USER_SESSION_RESET,

} from '../constants/userConstants';

const INIT_STATE = {
    user: null,
    error: null,
    loading: null,
}

export const userSessionReducer = (state = INIT_STATE, action) => {

    switch (action.type) {


        case USER_SESSION_REQUEST: {
            return { loading: true }
        }

        case USER_SESSION_SUCCESS: {
            return {
                loading: false,
                user: action.payload
            }
        }

        case USER_SESSION_FAIL: {
            return {
                loading: false,
                error: action.payload,
            }
        }

        case USER_SESSION_RESET: {
            return { user: null }
        }

        default: return state;

    }

}