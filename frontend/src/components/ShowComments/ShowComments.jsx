import React from 'react';
import {useSelector} from 'react-redux';
import Comment from '../Comment/Comment';

const ShowComments = () => {

    const comments = useSelector(state => state.singlePost.post.comments);
    
    return (
        <>
            {
                comments && comments.map((comment, index) => <Comment comment={comment} key={comment._id} margin={0} array={[index, 0, 0]} deep={0}/>)
                // comments && comments.map(id => <Comment id={id} key={id} maPrgin={0}/>)
            }
        </>
    )
}

export default ShowComments;
