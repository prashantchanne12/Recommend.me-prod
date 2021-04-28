import React, { useEffect } from 'react';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../actions/userActions';
import { fetchUserRecommendations } from '../../actions/recommendActions';

const UserProfile = ({match, history}) => {

    const dispatch = useDispatch();
    const {user, error} = useSelector(state => state.userProfile);
    const {loading} = useSelector(state => state.userFollow);
    const mySession = useSelector(state => state.mySession);
    const currentUser = mySession.user;
    const {lists} = useSelector(state => state.userRecommendations)

    if(user){    
      if(currentUser._id === match.params.userId){
            history.push('/profile');
        }
    }

    useEffect(() => {
        if(!user){
            dispatch(userProfile(match.params.userId));
        }

        if(!lists){
            dispatch(fetchUserRecommendations(match.params.userId));
        }

    },[dispatch, match, user, lists]);

    if(error){
        setTimeout(() => {
            history.push('/profile');
        },3000);
    }

    return user ? (
        <>
        <div className="container">
           <div className="row">
             <div className="column tab-container">
              <ProfileTabs lists={lists}/>
             </div>
             <div className="column profile-container">
              <Profile user={user} loading={loading} />
             </div>
           </div>
        </div>
     </>
    ) : error ? <div className="container">User not found</div> : <div className="container">Loading Profile...</div>
}

export default UserProfile;
