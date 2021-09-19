import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BiSend} from 'react-icons/bi';
import './addComment.scss';
import { addCommentAction } from '../../actions/commentActions';
import Loader from "react-loader-spinner";

const AddComment = ({user, id}) => {

    const [commentBody, setCommentBody] = useState('');
    const {loading} = useSelector(state => state.addComment);
    const dispatch = useDispatch();

    const addComment = () => {

        if(commentBody.length !== 0) {

            dispatch(addCommentAction({body: commentBody, id: id}));
            setCommentBody('');
        }
    }

    return (
        <>
            <div className="comment-section">
                    <p className="comment-as">Comment as <span>{user && user.userName}</span></p>
                    <textarea 
                        name="comment-text-area"
                        className="comment-text-area" 
                        cols="51" 
                        rows="3"
                        placeholder="Add a comment"
                        onChange={(e) =>{
                            setCommentBody(e.target.value)
                        }}
                        value={commentBody}

                        ></textarea>
                         {

                            loading &&  <Loader
                            className="add-comment-loader"
                            type="Oval"
                            color="#16a085"
                            height={20}
                            width={20}
                            />

                         }
                        <BiSend 
                            style={{
                                cursor: commentBody.length === 0 ? 'not-allowed' : 'pointer',
                            }}
                            className="send-comment-icon"
                            size={28}
                            onClick={() => addComment()}
                        />
            </div>  
        </>
    )
}

export default AddComment;
