import React from 'react';
import './comment.scss';

const Comment = ({margin, comment}) => {

    return (
        <>
            <div className="comment-wrapper"
                style={{
                    marginLeft: `${margin ? margin : 0}`
                }}
            >

                <div className="comment-section">
                    <div className="comment-from">
                        <div className="comment-userimg">
                            <img src={comment.fromUserImage} alt="" />
                        </div>
                        <div className="comment-username">{comment.fromUserName}</div>
                    </div>

                    <div className="comment-body">
                        <span>{comment.body}</span>
                    </div>
                </div>

                <div className="comment-buttons">
                    <span>reply</span>
                </div>

            </div>   
        </>
    )
}

export default Comment;
