import {

    WARNING_CARD_REQUEST,
    WARNING_CARD_RESET,
    WARNING_CARD_SUCCESS,

} from '../constants/warningConstants';
import { deleteMyRecommendation } from '../actions/recommendActions';

export const warningCardRequestAction = (id) => async (dispatch) => {
    dispatch({
        type: WARNING_CARD_REQUEST,
        payload: id,
    });
}

export const warningCardSuccessAction = (id) => async (dispatch) => {
    dispatch({ type: WARNING_CARD_SUCCESS });
    dispatch(deleteMyRecommendation(id));
}

export const warningCardResetAction = () => async (dispatch) => {
    dispatch({
        type: WARNING_CARD_RESET,
    });
}