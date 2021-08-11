import {

    ADD_RECOMMEND_LIST_REQUEST,
    ADD_RECOMMEND_LIST_SUCCESS,
    ADD_RECOMMEND_LIST_FAIL,

    FETCH_MY_RECOMMEND_LIST_REQUEST,
    FETCH_MY_RECOMMEND_LIST_SUCCESS,
    FETCH_MY_RECOMMEND_LIST_FAIL,
    FETCH_MY_RECOMMEND_LIST_RESET,

    FETCH_USER_RECOMMEND_LIST_REQUEST,
    FETCH_USER_RECOMMEND_LIST_SUCCESS,
    FETCH_USER_RECOMMEND_LIST_FAIL,
    FETCH_USER_RECOMMEND_LIST_RESET,

    UPVOTE_RECOMMEND_LIST_REQUEST,
    UPVOTE_RECOMMEND_LIST_SUCCESS,
    UPVOTE_RECOMMEND_LIST_FAIL,
    UPVOTE_RECOMMEND_LIST_RESET,

    DOWNVOTE_RECOMMEND_LIST_REQUEST,
    DOWNVOTE_RECOMMEND_LIST_SUCCESS,
    DOWNVOTE_RECOMMEND_LIST_FAIL,
    DOWNVOTE_RECOMMEND_LIST_RESET,

    SHARE_REQUEST,
    SHARE_RESET,

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

        default: return state;
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

export const fetchUserRecommendListReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_RECOMMEND_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case FETCH_USER_RECOMMEND_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                lists: action.payload,
            }
        }

        case FETCH_USER_RECOMMEND_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case FETCH_USER_RECOMMEND_LIST_RESET: return INIT_STATE;

        default: return state;


    }

}


export const upvoteRecommendListsReducer = (state = { result: null, error: null, loading: null }, action) => {

    switch (action.type) {

        case UPVOTE_RECOMMEND_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case UPVOTE_RECOMMEND_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                result: action.payload,
            }
        }


        case UPVOTE_RECOMMEND_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                result: null,
                error: action.payload,
            }
        }

        case UPVOTE_RECOMMEND_LIST_RESET: return { result: null, error: null, loading: null };

        default: return state;

    }

}

export const downvoteRecommendListsReducer = (state = { result: null, error: null, loading: null }, action) => {

    switch (action.type) {

        case DOWNVOTE_RECOMMEND_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case DOWNVOTE_RECOMMEND_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                result: action.payload,
            }
        }


        case DOWNVOTE_RECOMMEND_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                result: null,
                error: action.payload,
            }
        }

        case DOWNVOTE_RECOMMEND_LIST_RESET: return { result: null, error: null, loading: null };

        default: return state;

    }

}

export const shareListReducer = (state = { show: null, url: null }, action) => {

    switch (action.type) {


        case SHARE_REQUEST: {
            return {
                ...state,
                show: true,
                url: action.payload,
            }
        }

        case SHARE_RESET: {
            return {
                ...state,
                show: false,
                url: null,
            }
        }

        default: return state;

    }

}