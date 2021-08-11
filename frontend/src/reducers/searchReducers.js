import {

    SEARCH_PROFILE_REQUEST,
    SEARCH_PROFILE_SUCCESS,
    SEARCH_PROFILE_FAIL,
    SEARCH_PROFILE_RESET,

} from '../constants/searchConstants';

const INIT_STATE = {
    loading: false,
    error: null,
    users: null,
}

export const searchProfileReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case SEARCH_PROFILE_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case SEARCH_PROFILE_SUCCESS: {
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null,
            }
        }

        case SEARCH_PROFILE_FAIL: {
            return {
                ...state,
                loading: false,
                users: null,
                error: action.payload,
            }
        }

        case SEARCH_PROFILE_RESET: return INIT_STATE;

        default: return state;

    }

}