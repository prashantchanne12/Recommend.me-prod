import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListRequest } from '../../actions/recommendPostActions';
import './ListScreen.scss';
import { upvoteRecommendation, removeUpvoteRecommendation, shareAction } from '../../actions/recommendActions';
import {alertMessageAction} from '../../actions/alertActions';
import { IoShareSocialOutline, IoIosArrowDropupCircle, IoIosArrowDropup } from 'react-icons/all';
import dateFormat from 'dateformat';
import Tags from '../../components/Tags/Tags';

const ListScreen = ({match}) => {

    const dispatch = useDispatch();

    const id = match.params.listId;
    const {post, loading} = useSelector(state => state.post);
    const {user} = useSelector(state => state.mySession);
    const [tempUpvote, setTempUpvote] = useState(false)
    const [upvoteCount, setUpvoteCount] = useState(post ? post.upvotes.length : 0);
    const isUpvoted = user && post ? post.upvotes.includes(user._id) : false;

    useEffect(() => {

        if(post === null){
            dispatch(fetchListRequest(id));
        }
    }, [post, dispatch, id]);


    const handleSharing = () => {
        let re = new RegExp(/^.*\//);
        let share_link = re.exec(window.location.href)[0];
        share_link += `${post._id}`;
    
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

    const colors = post && post.tags.map(tag => {
        return tag.color;
    });

   

    return (
        <>
        {
            loading || !post
            ?
            <p>Loading...</p>
            :
            <div className="list-wrapper" 
           style={{
             borderTop: colors[0],
             borderTopWidth: 2,
             borderLeftWidth: 0,
             borderBottomWidth: 0,
             borderRightWidth: 0,
             borderStyle: 'solid',
             borderImage: `linear-gradient(to right, ${colors[0]} 50%, ${colors[1] ? colors[1] : colors[0]} 50%) 5`,
             width: '350px',
             margin: '2rem auto',
             position: 'relative',
         }}
        >


         <div className="list-container" id={post._id}>
                 <div className="list-data">
                         <div className="html-data" dangerouslySetInnerHTML={{ __html: `${post.data}` }} 
                         />
                 </div>
                 <div className="upvote-count">
                     <p className="count">{upvoteCount}</p>
                     <p className="name">upvotes</p>
                 </div>
                 <div className="section"
                    style={{
                        paddingTop: '1.2rem',
                    }}
                 >
                     <div className="section-icons">

                         {
                            isUpvoted || tempUpvote ?
                             <IoIosArrowDropupCircle 
                             className="upvoted-icon"
                             onClick={() => {

                                 if(user){
                                 setTempUpvote(false);
                                 setUpvoteCount(upvoteCount-1);
                                 dispatch(removeUpvoteRecommendation(post._id));
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
                                 dispatch(upvoteRecommendation(post._id));
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
                         <Tags tags={post.tags}/>
                     </div>
                 </div>    
                 <div className="hr"
                      style={{
                        marginTop: '1rem',
                    }}                 
                 ></div>
                 <div className="list-footer"
                  
                 >
                     <div className="list-img">
                         <img src={post.ownerPhotoUrl} alt=""/>
                     </div>
                    <div className="section-2">
                         <div className="list-username">
                             <p>{post.ownerUserName.split(' ')[0].length <= 9 ? post.ownerUserName.split(' ')[0] : post.ownerUserName.split(' ')[0].substr(0,9).toString()+'..'}</p>
                         </div>
                         <div className="list-date">
                             <p>{dateFormat(post.createdAt, "mmmm dS, yyyy")}</p>
                         </div>
                    </div>
                 </div>
             </div>
        </div>
        }
       </>
    )
}

export default ListScreen;
