import {
    ALERT_MESSAGE_REQUEST,
    ALERT_MESSAGE_RESET
} from '../constants/alertConstants';

const INIT_STATE = {
    message: null,
    type: null,
}

export const alertMessageReducer = (state = INIT_STATE, action) => {

    switch (action.type) {


        case ALERT_MESSAGE_REQUEST: {
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type,
            }
        }
        case ALERT_MESSAGE_RESET: {
            return {
                ...state,
                message: null,
                type: null,
            }
        }

        default: return INIT_STATE
    }

}