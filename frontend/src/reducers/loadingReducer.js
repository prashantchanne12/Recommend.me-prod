import {

    LOADING_START,
    LOADING_END,
    LOADING_RESET,

} from '../constants/loadingConstants';

const INIT_STATE = {
    loading: null,
    percentage: null,
}

export const loadingReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case LOADING_START: {
            return {
                ...state,
                loading: true,
                percentage: action.payload,
            }
        }

        case LOADING_END: {
            return {
                ...state,
                loading: false,
                percentage: action.payload,
            }
        }

        case LOADING_RESET: {
            return {
                ...state,
                loading: false,
                percentage: action.payload,
            }
        }

        default: return state;

    }

}