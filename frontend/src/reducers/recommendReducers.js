import {

    ADD_RECOMMEND_LIST_REQUEST,
    ADD_RECOMMEND_LIST_SUCCESS,
    ADD_RECOMMEND_LIST_FAIL,

} from '../constants/recommendConstants';

const INIT_STATE = {
    loading: false,
    error: null,
    list: null
}

export const addRecommendationReducer = (state = INIT_STATE, action) => {
    switch (action.type) {


        case ADD_RECOMMEND_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case ADD_RECOMMEND_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
            }
        }

        case ADD_RECOMMEND_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        default: { return state }
    }
}

