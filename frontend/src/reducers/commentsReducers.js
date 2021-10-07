// import {

//     ADD_COMMENT_REQUEST,
//     ADD_COMMENT_SUCESSS,
//     ADD_COMMENT_FAIL,
//     ADD_COMMENT_RESET,

//     ADD_REPLY_REQUEST,
//     ADD_REPLY_SUCESSS,
//     ADD_REPLY_FAIL,
//     ADD_REPLY_RESET,

//     FETCH_COMMENT_REQUEST,
//     FETCH_COMMENT_SUCESSS,
//     FETCH_COMMENT_FAIL,
//     FETCH_COMMENT_RESET,

// } from '../constants/commentConstants';

export const addCommentReducer = (state = { loading: false, error: null, comment: null }, action) => {

    switch (action.type) {

        case 'ADD_COMMENT_REQUEST': {
            return {
                ...state,
                loading: true,
            }
        }

        case 'ADD_COMMENT_SUCESSS': {
            return {
                ...state,
                comment: action.payload,
                loading: false
            }
        }

        case 'ADD_COMMENT_FAIL': {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case 'ADD_COMMENT_RESET': {
            return {
                ...state,
                loading: false,
                error: null,
                comment: null,

            }
        }

        default: return state;

    }

}

export const deleteCommentReducer = (state = { loading: false, error: null, comment: null, commentId: null }, action) => {

    switch (action.type) {

        case 'DELETE_COMMENT_REQUEST': {
            return {
                ...state,
                loading: true,
                commentId: action.payload,
            }
        }

        case 'DELETE_COMMENT_SUCESSS': {
            return {
                ...state,
                comment: action.payload,
                loading: false
            }
        }

        case 'DELETE_COMMENT_FAIL': {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case 'DELETE_COMMENT_RESET': {
            return {
                ...state,
                loading: false,
                error: null,
                comment: null,

            }
        }

        default: return state;

    }

}

export const addReplyCommentReducer = (state = { loading: false, error: null, comment: null }, action) => {

    switch (action.type) {

        case 'ADD_REPLY_REQUEST': {
            return {
                ...state,
                loading: true,
            }
        }

        case 'ADD_REPLY_SUCESSS': {
            return {
                ...state,
                comment: action.payload,
                loading: false
            }
        }

        case 'ADD_REPLY_FAIL': {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case 'ADD_REPLY_RESET': {
            return {
                ...state,
                loading: false,
                error: null,
                comment: null,

            }
        }

        default: return state;

    }

}

export const commentBoxReducer = (state = { id: null }, action) => {
    switch (action.type) {
        case 'ADD_COMMENT_ID': {
            return {
                id: action.payload,
            }
        }

        default: return state;
    }
}

export const fetchCommentReducer = (state = { loading: false, error: null, comment: null }, action) => {

    switch (action.type) {

        case 'FETCH_COMMENT_REQUEST': {
            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_COMMENT_SUCESSS': {
            return {
                ...state,
                comment: action.payload,
                loading: false
            }
        }

        case 'FETCH_COMMENT_FAIL': {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case 'FETCH_COMMENT_RESET': {
            return {
                ...state,
                loading: false,
                error: null,
                comment: null,

            }
        }

        default: return state;

    }

}