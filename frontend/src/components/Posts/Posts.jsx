import React from 'react';
import PostItem from '../PostItem/PostItem';
import './posts.scss';

import StackGrid from "react-stack-grid";
import useWindowDimensions from "../window-dimensions/window-dimension";

const Posts = ({props, loading}) => {

    let { width } = useWindowDimensions();

    return  (
        <>
            { props && <div className="posts-container">
                <StackGrid
                      gutterHeight={10}
                      gutterWidth={10}
                      columnWidth={width <= 800 ? (width < 500 ? "100%" : "50%") : "33.3%"}                >
                    {
                        props.map((item) => (
                                <PostItem key={item._id} item={item} />
                        ))
                    }
                </StackGrid>
            </div>
            }

            {
                loading && <p>Loading...</p>
            }

            {
                loading === false && props==null && <p>No posts for now</p>
            }
            {
                loading === false && props && props.length === 0 && <p>No posts for now</p>
            }
        </>
    ) 
}

export default Posts;
