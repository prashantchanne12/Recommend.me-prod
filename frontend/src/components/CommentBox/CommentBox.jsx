import React, {useState} from 'react';
import Loader from "react-loader-spinner";
// import {BiSend} from 'react-icons/bi';
import './commentBox.scss';


const CommentBox = ({loading, onClickFunction}) => {

    const [commentBody, setCommentBody] = useState('');


    return (
        <>
            <div className="comment-box">
               <div>
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
                </div>


                <div>
                    {

                    loading &&  
                    <Loader
                        className="add-comment-loader"
                        type="Oval"
                        color="#16a085"
                        height={20}
                        width={20}
                    />

                    }

                    <input 
                        type="button" 
                        value="comment"
                        className="add-comment-btn"
                        onClick={() => onClickFunction(commentBody, setCommentBody)}
                        style={{
                            cursor: commentBody.length === 0 ? 'not-allowed' : 'pointer',
                        }}
                        disabled={commentBody.length === 0} 
                    />

                    {/* <div
                        style={{
                            display: 'block',
                        }}
                    >
                        <BiSend 
                            style={{
                                cursor: commentBody.length === 0 ? 'not-allowed' : 'pointer',
                            }}
                            className="send-comment-icon"
                            size={28}
                            onClick={() => onClickFunction(commentBody, setCommentBody)}
                        />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default CommentBox;
