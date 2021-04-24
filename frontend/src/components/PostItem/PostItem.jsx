import React from 'react';
import './postItem.scss';

const PostItem = ({item}) => {

    return (
        <>
           <div className="list-container" id={item._id}>
               <div className="list-data">
               <div className="html-data" dangerouslySetInnerHTML={{ __html: `${item.data}` }} />
               </div>
           </div>
        </>
    )
}

export default PostItem;
