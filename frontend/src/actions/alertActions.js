import {
    ALERT_MESSAGE_REQUEST,
    ALERT_MESSAGE_RESET
} from '../constants/alertConstants';

export const alertMessageAction = ({ message, type }) => async (dispatch) => {

    dispatch({
        type: ALERT_MESSAGE_REQUEST,
        payload: { message, type }
    })
}

export const alertMessageResetAction = () => async (dispatch) => {

    dispatch({
        type: ALERT_MESSAGE_RESET,
    })
}