import {
  GET_CHAT_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_RESET,
  GET_CHAT_SUCESSS,
} from '../constants/chatConstants';

export const getChatsReducer = (
  state = {
    loading: false,
    error: null,
    chats: null,
  },
  action
) => {
  switch (action.type) {
    case GET_CHAT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_CHAT_SUCESSS: {
      return {
        ...state,
        chats: action.payload,
        loading: false,
      };
    }

    case GET_CHAT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case GET_CHAT_RESET: {
      return {
        loading: false,
        error: null,
        chats: null,
      };
    }

    default:
      return state;
  }
};
