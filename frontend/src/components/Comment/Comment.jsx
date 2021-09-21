import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import dateFormat from 'dateformat';
import './comment.scss';
import CommentBox from '../CommentBox/CommentBox';
import { addReplyCommentAction } from '../../actions/commentActions';

const Comment = ({comment, margin}) => {

    console.log(margin);

    // const [comment, setComment] = useState({});
    // const [loading, setLoading] = useState(false);
    const replyLoading = useSelector(state => state.addReplyComment.loading);
    const [reply, setReply] = useState(false);
    const dispatch = useDispatch();

    // useEffect(() => {
        
    //     const getComments = async () => {
    //         setLoading(true)
    //         const {data} = await axios.get(`/api/comments/getComment/${id}`);
    //         setComment(data);
    //         setLoading(false);
    //     }

    //     getComments();

    // },[id]);

    const addReply = (commentBody, setCommentBody) => {

        if(commentBody.length !== 0){

            dispatch(addReplyCommentAction({body: commentBody, commentId: comment._id}))
            setCommentBody('');
        }

    }

    return (
        <>
          {
            //    loading ? <div
            //     style={{
            //         textAlign: 'center',
            //     }}
            //    >

            //     <Loader
            //         type="ThreeDots"
            //         color="#0984e3"
            //         height={30}
            //         width={30}
            //         />

            //    </div> :
            <div className="comment-wrapper"
               style={{
                   marginLeft: `${margin}rem`
               }}
            >

               <div className="comment-section"
               >
                    <div className="comment-from">
                       <div className="comment">
                            <div className="comment-userimg">
                                <img src={comment.fromUserImage} alt="" />
                            </div>
                       </div>
                       <div>

                        <div className="name-and-date">
                            <div className="comment-username">{comment.fromUserName}</div>
                            <p>{dateFormat(comment.createdAt, "mmm dS, yyyy")}</p>
                        </div>

                        <div className="comment-body">
                                <p>{comment.body}</p>
                            </div>
                       </div>

                    </div>
                 
               </div>

               <div className="comment-buttons">
                   <span onClick={() => setReply(!reply)}>reply</span>
                   {
                       reply && <div 
                        style={{
                            paddingBottom: '0.3rem',
                            marginLeft: `${margin+2.5}rem`
                        }}
                       ><CommentBox loading={replyLoading} onClickFunction={addReply} /></div>
                   }
                   {
                      comment.replies && comment.replies.map(comment => <Comment comment={comment} margin={margin + 1}/>) 
                   }
               </div>
           </div>  
          }
        </>
    )
}

export default Comment;
