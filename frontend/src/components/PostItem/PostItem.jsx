import React from 'react';


const PostItem = ({item}) => {

    return (
        <>
           <div className="list-container" id={item._id}>
               <div dangerouslySetInnerHTML={{ __html: `${item.data}` }} />
           </div>
        </>
    )
}

export default PostItem;
