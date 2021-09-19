import React from 'react';
import {BiSend} from 'react-icons/bi';
import './addComment.scss';

const AddComment = ({user}) => {
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
                        ></textarea>
                        <BiSend 
                            className="send-comment-icon"
                            size={28}
                        />
            </div>  
        </>
    )
}

export default AddComment;
