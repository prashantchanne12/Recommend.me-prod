import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import './comment.scss';
import CommentBox from '../CommentBox/CommentBox';

const Comment = ({id, margin}) => {

    const [comment, setComment] = useState({});
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState(false);

    useEffect(() => {

        
        const getComments = async () => {
            setLoading(true)
            const {data} = await axios.get(`/api/comments/getComment/${id}`);
            setComment(data);
            setLoading(false);
        }

        getComments();

    },[id]);

    const addReply = () => {
        
    }

    return (
        <>
          {
               loading ? <div
                style={{
                    textAlign: 'center',
                }}
               >

                <Loader
                    type="ThreeDots"
                    color="#0984e3"
                    height={30}
                    width={30}
                    />

               </div> :  <div className="comment-wrapper"
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
                   <span onClick={() => setReply(!reply)}>reply</span>
                   {
                       reply && <div 
                        style={{
                            paddingBottom: '0.3rem',
                            marginLeft: `${margin+2.5}rem`
                        }}
                       ><CommentBox loading={loading} onClickFunction={addReply} /></div>
                   }
               </div>



           </div>  
          }
        </>
    )
}

export default Comment;
