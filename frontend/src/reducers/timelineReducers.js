import {

    MY_TIMELINE_REQUEST,
    MY_TIMELINE_SUCCESS,
    MY_TIMELINE_FAIL,
    MY_TIMELINE_RESET,

} from '../constants/timelineConstants';

const INIT_STATE = {
    timeline: null,
    error: null,
    loading: null,
}

export const myTimelineReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case MY_TIMELINE_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case MY_TIMELINE_SUCCESS: {
            return {
                ...state,
                loading: false,
                timeline: action.payload
            }
        }

        case MY_TIMELINE_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case MY_TIMELINE_RESET: return INIT_STATE;

        default: return state;

    }
}