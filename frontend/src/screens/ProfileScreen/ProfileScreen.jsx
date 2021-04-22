import React from 'react';
import './profileScreen.scss';

import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';


const ProfileScreen = () => {

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
