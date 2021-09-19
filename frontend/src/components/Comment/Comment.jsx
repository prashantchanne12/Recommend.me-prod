import React from 'react';
import './comment.scss';

const Comment = ({margin}) => {

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
                            <img src="https://randomuser.me/api/portraits/women/64.jpg" alt="" />
                        </div>
                        <div className="comment-username">maeve.wiley</div>
                    </div>

                    <div className="comment-body">
                        <span>This is comment body</span>
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
