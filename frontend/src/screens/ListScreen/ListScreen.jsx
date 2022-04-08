import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../actions/recommendPostActions';
import PostItem from '../../components/PostItem/PostItem';
import AddComment from '../../components/AddComment/AddComment';
import ShowComments from '../../components/ShowComments/ShowComments';
import './ListScreen.scss';
import Loading from '../../components/Loading/Loading';
// import { useState } from 'react';

const ListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.singlePost);
  const { user } = useSelector((state) => state.mySession);
  // const [loadComment, setLoadComment] = useState(true);

  useEffect(() => {
    // if(!post){
    //     dispatch(getPost(match.params.listId));
    // }
    dispatch(getPost(match.params.listId));
  }, [dispatch]); // match

  return (
    <div>
      {loading || !post ? (
        <div
          style={{
            marginTop: 10,
          }}
        >
          <Loading />
        </div>
      ) : (
        <div>
          <div
            style={{
              width: '420px',
              margin: '0 auto',
              marginTop: '2rem',
              position: 'relative',
            }}
          >
            <PostItem item={post} isSinglePost={true} />
            {/* <button onClick={() => setLoadComment(true)}>
              Click to load comments
            </button> */}
          </div>

          <div
            style={{
              width: '420px',
              margin: '0 auto',
            }}
          >
            {/* {loadComment && ( */}
            <>
              <div style={{ marginTop: '1rem' }}>
                <AddComment user={user} id={post._id} />
              </div>
              <ShowComments />
            </>
            {/* )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListScreen;
