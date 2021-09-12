import {

    WARNING_CARD_REQUEST,
    WARNING_CARD_SUCCESS,
    WARNING_CARD_RESET,

} from '../constants/warningConstants';

export const warningCardReducer = (state = { toggle: null, res: null, loading: null, id: null, profile: null }, action) => {

    switch (action.type) {

        case WARNING_CARD_REQUEST: {
            return {
                ...state,
                toggle: true,
                id: action.payload,
            }
        }

        case WARNING_CARD_SUCCESS: {
            return {
                ...state,
                loading: true,
            }
        }

        case 'GO_TO_PROFILE': {
            return {
                ...state,
                loading: false,
                profile: true,
            }
        }

        case WARNING_CARD_RESET: {
            return {
                toggle: null,
                res: null,
                id: null,
                loading: null,
                profile: null,
            }
        }

        default: return state;

    }

}