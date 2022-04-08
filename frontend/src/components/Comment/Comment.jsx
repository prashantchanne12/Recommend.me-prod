import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import Loader from 'react-loader-spinner';
import dateFormat from 'dateformat';
import './comment.scss';
import CommentBox from '../CommentBox/CommentBox';
import { DeleteOutlined } from '@ant-design/icons';
import {
  addReplyCommentAction,
  commentBoxIdAction,
  deleteCommentAction,
} from '../../actions/commentActions';
import { Link } from 'react-router-dom';

const Comment = ({ comment, margin, level, postId, count = 1 }) => {
  // const [comment, setComment] = useState({});
  // const [loading, setLoading] = useState(false);
  const replyLoading = useSelector((state) => state.addReplyComment.loading);
  const deleteLoading = useSelector((state) => state.deletecomment.loading);
  const loadingCommentId = useSelector(
    (state) => state.deletecomment.commentId
  );
  const commentBoxId = useSelector((state) => state.commentBox.id);
  const { user } = useSelector((state) => state.mySession);
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
    if (commentBody.length !== 0) {
      dispatch(
        addReplyCommentAction({
          body: commentBody,
          commentId: comment._id,
          level: level,
        })
      );
      setCommentBody('');
    }
  };

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
        <div
          className='comment-wrapper'
          style={{
            marginLeft: `${margin}rem`,
          }}
        >
          <div className='comment-section'>
            <div className='comment-from'>
              <div className='comment'>
                <div className='comment-userimg'>
                  <img src={comment.from.image} alt='' />
                </div>
              </div>
              <div>
                <div className='name-and-date'>
                  <div className='comment-username'>
                    {comment.from.userName}
                  </div>
                  <p>{dateFormat(comment.createdAt, 'mmm dS, yyyy')}</p>
                </div>

                <div className='comment-body'>
                  {!comment.deleted ? (
                    <p>{comment.body}</p>
                  ) : (
                    <p>This comment has been deleted</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='comment-buttons'>
            {user ? (
              <div className='comment-options'>
                <span
                  style={{
                    cursor: deleteLoading ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => {
                    setReply(!reply);
                    dispatch(commentBoxIdAction(comment._id));
                  }}
                >
                  reply
                </span>

                {comment.from.userName === user.userName && (
                  <DeleteOutlined
                    className='comment-delete'
                    style={{
                      cursor: deleteLoading ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => {
                      dispatch(
                        deleteCommentAction({ commentId: comment._id, level })
                      );
                    }}
                  />
                )}

                {deleteLoading && loadingCommentId === comment._id && (
                  <Loader
                    className='delete-comment-loader'
                    type='Oval'
                    color='#16a085'
                    height={12}
                    width={12}
                  />
                )}
              </div>
            ) : (
              <span>
                <Link
                  to={`/login?list/${postId}`}
                  style={{
                    color: '#0984e3',
                  }}
                >
                  Login
                </Link>{' '}
                to add reply
              </span>
            )}

            {reply && commentBoxId === comment._id ? (
              <div
                style={{
                  paddingBottom: '0.3rem',
                  marginLeft: `${margin + 2.5}rem`,
                }}
              >
                <CommentBox loading={replyLoading} onClickFunction={addReply} />
              </div>
            ) : (
              <></>
            )}

            {comment.replies &&
              comment.replies.map((comment) => {
                return (
                  <Comment
                    comment={comment}
                    margin={margin + 0.6}
                    count={count + 1}
                    level={level}
                    postId={postId}
                  />
                );
              })}
          </div>
        </div>
      }
    </>
  );
};

export default Comment;
