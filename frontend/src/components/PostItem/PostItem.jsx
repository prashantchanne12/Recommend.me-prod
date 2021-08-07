import React, {useEffect, useState} from 'react';
import './postItem.scss';
import dateFormat from 'dateformat';
import Tags from '../Tags/Tags';
import {useSelector, useDispatch} from 'react-redux';
import { upvoteRecommendation, removeUpvoteRecommendation } from '../../actions/recommendActions';
import { IoShareSocialOutline, IoIosArrowDropupCircle, IoIosArrowDropup } from 'react-icons/all';

const PostItem = ({item}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.mySession);
    const [tempUpvote, setTempUpvote] = useState(false)
    const [upvoteCount, setUpvoteCount] = useState(item ? item.upvotes.length : 0);

    const colors = item.tags.map(tag => {
        return tag.color;
    });

    useEffect(() => {
    }, []);

    return (
        <>
           <div className="list-wrapper" 
              style={{
                borderTop: colors[0],
                borderTopWidth: 2,
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderStyle: 'solid',
                borderImage: `linear-gradient(to right, ${colors[0]} 50%, ${colors[1] ? colors[1] : colors[0]} 50%) 5`,
            }}
           >
            <div className="list-container" id={item._id} >
                    <div className="list-data">
                            <div className="html-data" dangerouslySetInnerHTML={{ __html: `${item.data}` }} />
                    </div>
                    <div className="upvote-count">
                        <p className="count">{upvoteCount}</p>
                        <p className="name">upvotes</p>
                    </div>
                    <div className="section">
                        <div className="section-icons">

                            {
                                item.upvotes.includes(user._id) || tempUpvote ?
                                <IoIosArrowDropupCircle 
                                className="upvoted-icon"
                                onClick={() => {
                                    setTempUpvote(false);
                                    setUpvoteCount(upvoteCount-1);
                                    dispatch(removeUpvoteRecommendation(item._id));
                                }}
                                />
                                :
                                <IoIosArrowDropup className="upvote-icon"
                                 onClick={() => {
                                    setTempUpvote(true);
                                    setUpvoteCount(upvoteCount+1);
                                    dispatch(upvoteRecommendation(item._id));
                                }}/>
                              
                            }

                        <IoShareSocialOutline className="share-icon" />
                        </div>
                        <div className="list-tags">
                            <Tags tags={item.tags}/>
                        </div>
                    </div>    
                    <div className="hr"></div>
                    <div className="list-footer">
                        <div className="list-img">
                            <img src={item.ownerPhotoUrl} alt=""/>
                        </div>
                       <div className="section-2">
                            <div className="list-username">
                                <p>{item.ownerUserName.split(' ')[0].length <= 9 ? item.ownerUserName.split(' ')[0] : item.ownerUserName.split(' ')[0].substr(0,9).toString()+'..'}</p>
                            </div>
                            <div className="list-date">
                                <p>{dateFormat(item.createdAt, "mmmm dS, yyyy")}</p>
                            </div>
                       </div>
                    </div>
                </div>
           </div>
        </>
    )
}

export default PostItem;
