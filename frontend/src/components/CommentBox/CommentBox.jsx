import React, {useState} from 'react';
import Loader from "react-loader-spinner";
import {BiSend} from 'react-icons/bi';
import './commentBox.scss';


const CommentBox = ({loading, onClickFunction}) => {

    const [commentBody, setCommentBody] = useState('');


    return (
        <>
            <div
                className="comment-box"
            >
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
                onClick={() => onClickFunction(commentBody, setCommentBody)}
            />
            </div>
        </>
    )
}

export default CommentBox;
