import {

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCESSS,
    ADD_COMMENT_FAIL,
    ADD_COMMENT_RESET,

} from '../constants/commentConstants';

export const addCommentReducer = (state = { loading: false, error: null, comment: null }, action) => {

    switch (action.type) {

        case ADD_COMMENT_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case ADD_COMMENT_SUCESSS: {
            return {
                ...state,
                comment: action.payload,
                loading: false
            }
        }

        case ADD_COMMENT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case ADD_COMMENT_RESET: {
            return {
                ...state,
                loading: false,
                error: null,
                comment: null,

            }
        }

        default: return state;

    }

}