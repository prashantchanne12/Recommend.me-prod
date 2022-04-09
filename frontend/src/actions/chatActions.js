import axios from 'axios';

import {
  GET_CHAT_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCESSS,
} from '../constants/chatConstants';

export const getChatAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_REQUEST });

    const { data } = await axios.get('/api/chat');

    dispatch({
      type: GET_CHAT_SUCESSS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_CHAT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
