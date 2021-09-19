import axios from 'axios';
import {

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCESSS,
    ADD_COMMENT_FAIL,


} from '../constants/commentConstants';

export const addCommentAction = (body) => async (dispatch) => {

    try {

        dispatch({
            type: ADD_COMMENT_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            `/api/comments/create`,
            body,
            config
        );

        dispatch({
            type: ADD_COMMENT_SUCESSS,
            payload: data
        });

    } catch (err) {
        dispatch({
            type: ADD_COMMENT_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }

}