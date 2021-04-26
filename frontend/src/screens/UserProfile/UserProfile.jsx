import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../actions/userActions';

const UserProfile = ({match}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.userProfile);

    useEffect(() => {
        if(!user){
            dispatch(userProfile(match.params.userId));
        }
    },[dispatch, match, user]);

    return user ? (
        <div className='container'>
            {user.firstName}
        </div>
    ) : <div>Loading...</div>
}

export default UserProfile;
