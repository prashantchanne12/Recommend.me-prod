import React from 'react';
import PostItem from '../PostItem/PostItem';
import './posts.scss';

import StackGrid from "react-stack-grid";
import useWindowDimensions from "../window-dimensions/window-dimension";

const Posts = ({props}) => {

    const { height, width } = useWindowDimensions();


    return props ? (
        <>
            <div className="posts-container">
                <StackGrid
                      gutterHeight={10}
                      gutterWidth={10}
                      columnWidth={width <= 800 ? (width < 500 ? "100%" : "50%") : "25%"}                >
                    {
                        props.map((item) => (
                                <PostItem key={item._id} item={item} />
                        ))
                    }
                </StackGrid>
            </div>
        </>
    ) : <div>Loading...</div>
}

export default Posts;
