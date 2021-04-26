import React, { useEffect } from 'react';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../actions/userActions';
import { fetchUserRecommendations } from '../../actions/recommendActions';

const UserProfile = ({match}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.userProfile);
    const {lists} = useSelector(state => state.userRecommendations)

    useEffect(() => {
        if(!user){
            dispatch(userProfile(match.params.userId));
        }

        if(!lists){
            dispatch(fetchUserRecommendations(match.params.userId));
        }
    },[dispatch, match, user, lists]);

    return user ? (
        <>
        <div className="container">
           <div className="row">
             <div className="column tab-container">
              <ProfileTabs lists={lists}/>
             </div>
             <div className="column profile-container">
              <Profile user={user} />
             </div>
           </div>
        </div>
     </>
    ) : <div>Loading...</div>
}

export default UserProfile;
