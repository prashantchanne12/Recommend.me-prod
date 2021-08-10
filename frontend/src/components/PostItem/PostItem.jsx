import React, {useState} from 'react';
import './postItem.scss';
import dateFormat from 'dateformat';
import Tags from '../Tags/Tags';
import {useSelector, useDispatch} from 'react-redux';
import { upvoteRecommendation, removeUpvoteRecommendation, shareAction } from '../../actions/recommendActions';
import {alertMessageAction} from '../../actions/alertActions';
import { IoShareSocialOutline, IoIosArrowDropupCircle, IoIosArrowDropup } from 'react-icons/all';
import { FETCH_LIST_SUCCESS } from '../../constants/recommendPostConstants';
import { useHistory } from 'react-router-dom'; 



const PostItem = ({item, isSinglePost}) => {
    
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.mySession);
    const [tempUpvote, setTempUpvote] = useState(false)
    const [upvoteCount, setUpvoteCount] = useState(item ? item.upvotes.length : 0);
    const isUpvoted = user ? item.upvotes.includes(user._id) : false;
    const history = useHistory();

    const handleSharing = () => {
        let re = new RegExp(/^.*\//);
        let share_link = re.exec(window.location.href)[0];
        share_link += isSinglePost ? `${item._id}`  : `list/${item._id}`;
    
        if (navigator.share) {
          navigator
            .share({
              title: "Check out my recommendation",
              url: share_link,
            })
            .then(() => {
              // console.log("Thanks for sharing");
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          dispatch(shareAction(share_link));
        }
      };

    const colors = item && item.tags.map(tag => {
        return tag.color;
    });

    return (
        <>
           <div className="list-wrapper" 
              style={{
                borderTop: colors && colors[0],
                borderTopWidth: 2,
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderStyle: 'solid',
                borderImage: colors && `linear-gradient(to right, ${colors[0]} 50%, ${colors[1] ? colors[1] : colors[0]} 50%) 5`,
            }}
           >


            <div className="list-container" id={item._id} >
                    <div className="list-data"
                          style={{
                            cursor: !isSinglePost && 'pointer',
                        }}
                        onClick={() => {
                            if(!isSinglePost){
                                dispatch({
                                    type: FETCH_LIST_SUCCESS,
                                    payload: item,
                                });
                                history.push(`/list/${item._id}`);
                            }
                        }}
                    >
                            <div className="html-data" dangerouslySetInnerHTML={{ __html: `${item.data}` }} />
                    </div>
                    <div className="upvote-count">
                        <p className="count">{upvoteCount}</p>
                        <p className="name">upvotes</p>
                    </div>
                    <div className="section">
                        <div className="section-icons">

                            {
                               isUpvoted || tempUpvote ?
                                <IoIosArrowDropupCircle 
                                className="upvoted-icon"
                                onClick={() => {

                                    if(user){
                                    setTempUpvote(false);
                                    setUpvoteCount(upvoteCount-1);
                                    dispatch(removeUpvoteRecommendation(item._id));
                                    }else{
                                        dispatch(alertMessageAction({message: "You need to log in!", type: "failure"}));
                                    }
                                }}
                                />
                                :
                                <IoIosArrowDropup className="upvote-icon"
                                 onClick={() => {
                                    if(user){
                                    setTempUpvote(true);
                                    setUpvoteCount(upvoteCount+1);
                                    dispatch(upvoteRecommendation(item._id));
                                    }else{
                                        dispatch(alertMessageAction({message: "You need to log in!", type: "failure"}));
                                    }
                                }}/>
                              
                            }

                        <IoShareSocialOutline className="share-icon"
                            onClick={() => {
                                handleSharing();
                            }}
                        />
                        </div>
                        <div className="list-tags">
                            <Tags tags={item.tags}/>
                        </div>
                    </div>    
                    <div className="hr"
                        style={{
                            marginTop: '1rem'
                        }}
                    ></div>
                    <div className="list-footer"
                        onClick={() => {
                            history.push(`/profile/${item.owner}`);
                        }}
                    >
                        <div className="list-img"
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            <img src={item.ownerPhotoUrl} alt=""/>
                        </div>
                       <div className="section-2">
                            <div className="list-username"
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
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
