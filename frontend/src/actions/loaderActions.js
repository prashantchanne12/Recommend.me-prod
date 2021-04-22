import {
    LOADING_START,
    LOADING_END
} from '../constants/loaderConstants';

export const loadingStart = () => async (dispatch) => {

    dispatch({
        type: LOADING_START,
    });

}

export const loadingEnd = () => async (dispatch) => {

    dispatch({
        type: LOADING_END,
    });

}