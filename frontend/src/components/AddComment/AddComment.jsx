import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './addComment.scss';
import {Link} from 'react-router-dom';
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
            { 
            user ? <div className="comment-section">
                    <div>
                        <p className="comment-as">Comment as <span>{user && user.userName}</span></p>
                        <CommentBox 
                            loading={loading} 
                            onClickFunction={addComment} />
                    
                    </div>
                </div> 
             : <p 
                style={{
                    paddingBottom: '0.7rem',
                    fontSize: '14px'
                }}
            > <Link to='/login?redirect=helloworld'><span
                style={{
                    textDecoration: 'underline',
                    color: '#0984e3',
                    fontWeight: 500,
                }}
            >Login</span></Link> to add comment</p> 
            }
        </>
    )
}

export default AddComment;
