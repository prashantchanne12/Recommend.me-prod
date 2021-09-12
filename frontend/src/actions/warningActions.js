import {

    WARNING_CARD_REQUEST,
    WARNING_CARD_RESET,
    WARNING_CARD_SUCCESS,

} from '../constants/warningConstants';

export const warningCardRequestAction = () => async (dispatch) => {
    dispatch({
        type: WARNING_CARD_REQUEST,
    });
}

export const warningCardSuccessAction = () => async (dispatch) => {




}

export const warningCardResetAction = () => async (dispatch) => {
    dispatch({
        type: WARNING_CARD_RESET,
    });
}