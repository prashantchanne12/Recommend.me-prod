import React, {useEffect} from 'react';
import './profileScreen.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';


const ProfileScreen = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(state => state.userProfile);
    const { user } = profile;

    useEffect(() => {
        if(!user){
            history.push('/login');
        }
    },[dispatch, user, history, profile]);

    return (
        <>
           <div className="container-md">
              <div className="profile-container">
                <ProfileTabs />
                <Profile />
              </div>
           </div>
        </>
    )
}

export default ProfileScreen;
