import React, {useEffect} from 'react';
import './profileScreen.scss';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';

import { useSelector, useDispatch } from 'react-redux';
import { mySession } from '../../actions/userActions';
import { fetchMyRecommendations } from '../../actions/recommendActions';

const ProfileScreen = ({history}) => {

    const dispatch = useDispatch();

    const {user, error} = useSelector(state => state.mySession);
    const {lists, loading} = useSelector(state => state.myRecommendations);

    useEffect(() => {
    
      if(!user){
        dispatch(mySession());
      }else{
        if(!lists){
          dispatch(fetchMyRecommendations());
        }
      }

    }, [user, history, dispatch, lists, loading]);

    if(error){
      history.push('/login');
    }

    return (
        <>
           <div className="container">
              <div className="row">
                <div className="column tab-container">
                 <ProfileTabs lists={lists} loading={loading}/>
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
