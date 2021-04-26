import {

    ADD_RECOMMEND_LIST_REQUEST,
    ADD_RECOMMEND_LIST_SUCCESS,
    ADD_RECOMMEND_LIST_FAIL,

    FETCH_MY_RECOMMEND_LIST_REQUEST,
    FETCH_MY_RECOMMEND_LIST_SUCCESS,
    FETCH_MY_RECOMMEND_LIST_FAIL,
    FETCH_MY_RECOMMEND_LIST_RESET,

} from '../constants/recommendConstants';

const INIT_STATE = {
    loading: false,
    error: null,
    lists: null
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

export const fetchMyRecommendListsReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case FETCH_MY_RECOMMEND_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case FETCH_MY_RECOMMEND_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                lists: action.payload,
            }
        }


        case FETCH_MY_RECOMMEND_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                lists: null,
                error: action.payload,
            }
        }

        case FETCH_MY_RECOMMEND_LIST_RESET: return INIT_STATE;

        default: return state;

    }

}