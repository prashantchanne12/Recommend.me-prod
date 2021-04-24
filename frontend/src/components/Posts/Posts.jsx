import React from 'react';
import PostItem from '../PostItem/PostItem';
import './posts.scss';

const Posts = ({props}) => {
    return props ? (
        <>
            <div className="posts-container">
               {
                   props.map((item) => (
                        <PostItem key={item._id} item={item} />
                   ))
               }
            </div>
        </>
    ) : <div>Loading...</div>
}

export default Posts;
