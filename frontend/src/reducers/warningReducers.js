import {

    WARNING_CARD_REQUEST,
    WARNING_CARD_SUCCESS,
    WARNING_CARD_RESET,

} from '../constants/warningConstants';

export const warningCardReducer = (state = { toggle: null, res: null }, action) => {

    switch (action.type) {

        case WARNING_CARD_REQUEST: {
            return {
                ...state,
                toggle: true
            }
        }

        case WARNING_CARD_SUCCESS: {
            return {
                ...state,
                res: action.payload
            }
        }

        case WARNING_CARD_RESET: {
            return {
                toggle: null,
                res: null,
            }
        }

        default: return state;

    }

}