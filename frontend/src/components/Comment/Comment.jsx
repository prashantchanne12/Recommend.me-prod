import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import axios from 'axios';
// import Loader from 'react-loader-spinner';
import dateFormat from 'dateformat';
import './comment.scss';
import CommentBox from '../CommentBox/CommentBox';
import {AiOutlineDelete} from 'react-icons/ai';
import { addReplyCommentAction, commentBoxIdAction } from '../../actions/commentActions';
import { Link } from 'react-router-dom';


const Comment = ({comment, margin, level, postId}) => {

    // const [comment, setComment] = useState({});
    // const [loading, setLoading] = useState(false);
    const replyLoading = useSelector(state => state.addReplyComment.loading);
    const commentBoxId = useSelector(state => state.commentBox.id);
    const {user} = useSelector(state => state.mySession);
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

            dispatch(addReplyCommentAction({body: commentBody, commentId: comment._id, level: level}));
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
                                <img src={comment.from.image} alt="" />
                            </div>
                       </div>
                       <div>

                        <div className="name-and-date">
                            <div className="comment-username">{comment.from.userName}</div>
                            <p>{dateFormat(comment.createdAt, "mmm dS, yyyy")}</p>
                        </div>

                        <div className="comment-body">
                                <p>{comment.body}</p>
                            </div>
                       </div>

                    </div>
                 
               </div>

               <div className="comment-buttons">
                  
                    {
                        user ? <div className="comment-options">
                            <span onClick={() => {
                                setReply(!reply);                      
                                dispatch(commentBoxIdAction(comment._id));
                    
        
                            }}>reply</span>

                            {
                                comment.from._id === user._id && <AiOutlineDelete className="comment-delete" />
                            }
                        </div> : <span><Link 
                                                    to={`/login?list/${postId}`}
                                                    style={{
                                                        color: '#0984e3',
                                                    }}        
                                                >Login</Link> to add reply</span>
                    }

                     {
                         reply && commentBoxId === comment._id ?
                         <div 
                          style={{
                              paddingBottom: '0.3rem',
                              marginLeft: `${margin+2.5}rem`
                          }}
                         ><CommentBox loading={replyLoading} onClickFunction={addReply} /></div>:<></>
                     }
                  
                   {
                      comment.replies && comment.replies.map((comment) => {

                          return (
                            <Comment 
                                comment={comment} 
                                margin={margin + 0.5} 
                                level={level}
                                postId={postId}
                            />
                          )
                      }) 
                   }
               </div>
           </div>  
          }
        </>
    )
}

export default Comment;
