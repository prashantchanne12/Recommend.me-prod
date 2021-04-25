import {
    ALERT_MESSAGE_REQUEST,
    ALERT_MESSAGE_RESET
} from '../constants/alertConstants';

const INIT_STATE = {
    message: null,
    color: null,
}

export const alertMessageReducer = (state = INIT_STATE, action) => {

    switch (action.type) {


        case ALERT_MESSAGE_REQUEST: {
            return {
                ...state,
                message: action.payload.message,
                color: action.payload.color,
            }
        }
        case ALERT_MESSAGE_RESET: {
            return {
                ...state,
                message: null,
                color: null,
            }
        }

        default: return INIT_STATE
    }

}