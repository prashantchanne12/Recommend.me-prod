import React, {useEffect} from 'react';
import './profileScreen.scss';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';

import { useSelector } from 'react-redux';

const ProfileScreen = ({history}) => {

    const userSession = useSelector(state => state.userSession);
    const {user} = userSession;

    useEffect(() => {
    
      if(!user){
        history.push('/login');
      }

    }, [user, history]);

    return (
        <>
           <div className="container-lg">
              <div className="row">
                <div className="column tab-container">
                 <ProfileTabs />
                </div>
                <div className="column">
                 <Profile user={user} />
                </div>
              </div>
           </div>
        </>
    )
}

export default ProfileScreen;
