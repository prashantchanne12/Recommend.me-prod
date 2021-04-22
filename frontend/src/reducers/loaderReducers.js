import {
    LOADING_START,
    LOADING_END,
} from '../constants/loaderConstants';

const INIT_STATE = {
    loading: false,
}


export const loaderReducer = (state = INIT_STATE, action) => {

    switch (action.type) {


        case LOADING_START: {
            return { ...state, loading: true }
        }

        case LOADING_END: {
            return { ...state, loading: false }
        }

        default: return INIT_STATE;

    }

}

