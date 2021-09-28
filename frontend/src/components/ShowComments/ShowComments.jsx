import React from 'react';
import {useSelector} from 'react-redux';
import Comment from '../Comment/Comment';

const ShowComments = () => {

    const comments = useSelector(state => state.singlePost.post.comments);
    const postId = useSelector(state => state.singlePost.post);
    
    return (
        <>
            {
                comments && comments.map((comment, index) => <Comment comment={comment} key={comment._id} margin={0} level={index} postId={postId._id}/>)
                // comments && comments.map(id => <Comment id={id} key={id} maPrgin={0}/>)
            }
        </>
    )
}

export default ShowComments;
