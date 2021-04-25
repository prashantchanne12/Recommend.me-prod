import {
    ALERT_MESSAGE_REQUEST,
    ALERT_MESSAGE_RESET
} from '../constants/alertConstants';

export const alertMessageAction = ({ message, color }) => async (dispatch) => {

    dispatch({
        type: ALERT_MESSAGE_REQUEST,
        payload: { message, color }
    })
}

export const alertMessageResetAction = () => async (dispatch) => {

    dispatch({
        type: ALERT_MESSAGE_RESET,
    })
}