import {

    FETCH_LIST_REQUEST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAIL,
    FETCH_LIST_RESET,

} from '../constants/recommendPostConstants';

const INIT_STATE = {
    post: null,
    loading: null,
    error: null,
}

export const postReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case FETCH_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case FETCH_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                post: action.payload,
            }
        }

        case FETCH_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                post: null,
                error: action.payload,
            }
        }

        case FETCH_LIST_RESET: return INIT_STATE;

        default: return state;
    }

}