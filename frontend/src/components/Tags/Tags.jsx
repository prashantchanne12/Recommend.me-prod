import React from 'react';
import './tags.scss';

const Tags = ({tags}) => {
    return (
        <>
        <div className="tags-container">
         {
             tags.map(tag => (
                <div 
                key={tag.color}
                className="tag" style={{backgroundColor: tag.color}}>
                    <div className="tag-name">
                        <p>{tag.label}</p>   
                    </div>
                </div> 
             ))
         }
         </div>
        </>
    )
}

export default Tags;
