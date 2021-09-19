import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './addComment.scss';
import { addCommentAction } from '../../actions/commentActions';
import CommentBox from '../CommentBox/CommentBox';

const AddComment = ({user, id}) => {

    const {loading} = useSelector(state => state.addComment);
    const dispatch = useDispatch();

    const addComment = (commentBody, setCommentBody) => {

        if(commentBody.length !== 0) {

            dispatch(addCommentAction({body: commentBody, id: id}));
            setCommentBody('');
        }
    }

    return (
        <>
            <div className="comment-section">
                    <p className="comment-as">Comment as <span>{user && user.userName}</span></p>
                    <CommentBox loading={loading} onClickFunction={addComment} />
            </div>  
        </>
    )
}

export default AddComment;
