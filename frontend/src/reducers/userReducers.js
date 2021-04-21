import {

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,

} from '../constants/userConstants';

const INIT_STATE = {
    user: null,
    error: null,
    loading: null,
}

export const userProfileReducer = (state = INIT_STATE, action) => {

    switch (action.type) {


        case USER_PROFILE_REQUEST: {
            return { loading: true }
        }

        case USER_PROFILE_SUCCESS: {
            return {
                loading: false,
                user: action.payload
            }
        }

        case USER_PROFILE_FAIL: {
            return {
                loading: false,
                error: action.payload,
            }
        }

        case USER_PROFILE_RESET: {
            return { user: null }
        }

        default: return state;

    }

}