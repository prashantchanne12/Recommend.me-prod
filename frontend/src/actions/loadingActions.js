import {
    LOADING_START,
    LOADING_END,
    LOADING_RESET,

} from '../constants/loadingConstants';

export const loadingStartAction = () => async (dispatch) => {
    dispatch({
        type: LOADING_START,
        payload: 60,
    });
}

export const loadingEndAction = () => async (dispatch) => {
    dispatch({
        type: LOADING_END,
        payload: 100,
    });
}

export const loadingResetAction = () => async (dispatch) => {
    dispatch({
        type: LOADING_RESET,
        payload: 0,
    });
}