import React from 'react';
import {useSelector} from 'react-redux';
import Comment from '../Comment/Comment';

const ShowComments = () => {

    const comments = useSelector(state => state.singlePost.post.comments);
    
    return (
        <>
            {
                // comments && comments.map(comment => <Comment comment={comment} key={comment._id}/>)
                comments && comments.map(id => <Comment id={id} key={id} margin={0}/>)
            }
        </>
    )
}

export default ShowComments;
