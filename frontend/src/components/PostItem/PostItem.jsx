import React, {useState} from 'react';
import './postItem.scss';
import dateFormat from 'dateformat';
import Tags from '../Tags/Tags';
import {useSelector, useDispatch} from 'react-redux';
import { upvoteRecommendation, removeUpvoteRecommendation, shareAction } from '../../actions/recommendActions';
import {alertMessageAction} from '../../actions/alertActions';
import { IoShareSocialOutline, IoIosArrowDropupCircle, IoIosArrowDropup, AiOutlineDelete } from 'react-icons/all';
import { useHistory } from 'react-router-dom'; 
import { FETCH_LIST_SUCCESS } from '../../constants/recommendPostConstants';
import { warningCardRequestAction } from '../../actions/warningActions';



const PostItem = ({item, isSinglePost}) => {
    
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.mySession);
    const [upvoteCount, setUpvoteCount] = useState(item ? item.upvotes.length : 0);
    let [isUpvoted, setIsUpvoted] = useState(user ? item.upvotes.includes(user._id) : false);
    const [isHover, setHover] = useState(false);
    const history = useHistory();
    const isMyPost = new Set(user.recommendations).has(item._id);
    let upvoteSet = new Set(item.upvotes);


    const notification = {
        postId: item._id,
        ownerId: item.owner,
        userName: user && user.userName,
        userProfileImg: user && user.image,
        title: item.title,
    }

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

    const colors = item.tags.map(tag => {
        return tag.color;
    });


    const upvoteDownvoteLocal = () => {

        if (isUpvoted){

            upvoteSet.delete(user._id);
            item.upvotes = Array.from(upvoteSet);

        }else{

            upvoteSet.add(user._id);
            item.upvotes = Array.from(upvoteSet);

        }

    }


    const onClickPost = () => {
        
        // if(isUpvoted) { 

        //     if(!upvoteSet.has(user._id)){
        //         item.upvotes.push(user._id);
        //     }

        // }else{
        //     upvoteSet.delete(user._id);
        //     item.upvotes = Array.from(upvoteSet);
        // }


        if(!isSinglePost){
            dispatch({
                type: FETCH_LIST_SUCCESS,
                payload: {...item, upvotes: item.upvotes},
            });
            history.push(`/list/${item._id}`);
        }
    }

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
                  
                    <div className="list-data"
                        //   style={{
                        //     cursor: !isSinglePost && 'pointer',
                        // }}
                        // onClick={() => { onClickPost(); }}
                    >
                        <span 
                         className="post-title"
                         onMouseEnter={() => setHover(true)}
                         onMouseLeave={() => setHover(false)}
                         style={{
                            fontWeight: 700,
                            cursor: !isSinglePost && 'pointer',
                            color: isHover && !isSinglePost && '#2e86de',
                         }}
                         onClick={() => { onClickPost();
    
                        }}
                        >{item.title}</span>
                    
                            <div className="html-data" dangerouslySetInnerHTML={{ __html: `${item.data}` }} />
                    </div>
                    <div className="upvote-count">
                        <p className="count">{upvoteCount}</p>
                        <p className="name">upvotes</p>
                    </div>
                    <div className="section">
                        <div className="section-icons">

                            {
                               isUpvoted ?
                                <IoIosArrowDropupCircle 
                                className="upvoted-icon"
                                onClick={() => {

                                    if(user){
                                        setIsUpvoted(false);
                                        setUpvoteCount(upvoteCount-1);
                                        upvoteDownvoteLocal();
                                        dispatch(removeUpvoteRecommendation(item._id, 
                                            {type: 'upvote', recommendation: item._id}
                                        ));
                                    }else{
                                        dispatch(alertMessageAction({message: "You need to log in!", type: "failure"}));
                                    }
                                }}
                                />
                                :
                                <IoIosArrowDropup className="upvote-icon"
                                 onClick={() => {
                                    if(user){
                                        setIsUpvoted(true);
                                        setUpvoteCount(upvoteCount+1);
                                        upvoteDownvoteLocal();
                                        dispatch(upvoteRecommendation(item._id, notification, isMyPost));
                                        
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

                    {
                        isSinglePost && isMyPost && <AiOutlineDelete
                        onClick={() => {
                            dispatch(warningCardRequestAction());
                        }}
                        className="delete-icon" />
                    }
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
                                <p>{dateFormat(item.createdAt, "mmm dS, yyyy")}</p>
                            </div>
                       </div>
                    </div>
                </div>
           </div>
        </>
    )
}

export default PostItem;
