import React, { useEffect } from 'react';

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
        <div className='container'>
            {user.firstName}
        </div>
    ) : <div>Loading...</div>
}

export default UserProfile;
