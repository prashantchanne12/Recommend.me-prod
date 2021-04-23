import React from 'react';
import PostItem from '../PostItem/PostItem';
import './posts.scss';

const Posts = ({props}) => {
    return (
        <>
            <div className="posts-container">
                { props.map((id)=> (
                    <PostItem id={id} key={id}/>
                )) }
            </div>
        </>
    )
}

export default Posts;
