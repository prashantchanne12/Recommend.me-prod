import React, {useEffect} from 'react';
import './profileScreen.scss';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMyRecommendations } from '../../actions/recommendActions';

const ProfileScreen = ({history}) => {

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.mySession);
    const {lists} = useSelector(state => state.myRecommendations);

    useEffect(() => {
    
      if(!user){
        history.push('/login');
      }else{
        if(!lists){
          dispatch(fetchMyRecommendations());
        }
      }

    }, [user, history, dispatch, lists]);


    return (
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
    )
}

export default ProfileScreen;
