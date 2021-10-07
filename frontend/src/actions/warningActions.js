import {

    WARNING_CARD_REQUEST,
    WARNING_CARD_RESET,
    WARNING_CARD_SUCCESS,

} from '../constants/warningConstants';
import { deleteMyRecommendation } from '../actions/recommendActions';

export const warningCardRequestAction = ({ type, id }) => async (dispatch) => {
    dispatch({
        type: WARNING_CARD_REQUEST,
        payload: { type, id },
    });
}

export const warningCardSuccessAction = () => async (dispatch, getState) => {

    dispatch({ type: WARNING_CARD_SUCCESS });

    const state = getState();
    const id = state.warningCard.id;
    const type = state.warningCard.type;

    if (type === 'list') {
        dispatch(deleteMyRecommendation(id));
    } else if (type === 'comment') {
        // delete comment 
    }

}

export const warningCardResetAction = () => async (dispatch) => {
    dispatch({
        type: WARNING_CARD_RESET,
    });
}