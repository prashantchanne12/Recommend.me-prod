import React, {useEffect} from 'react';
import './profileScreen.scss';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';

import { useSelector, useDispatch } from 'react-redux';
import { fetchRecommendation } from '../../actions/recommendActions';
import { loadingEndAction } from '../../actions/loadingActions';

const ProfileScreen = ({history}) => {

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.mySession);

    const userRecommendation = useSelector(state => state.userRecommendations);
    const {loading} = userRecommendation;

    useEffect(() => {
    
      if(!user){
        history.push('/login');
      }else{
        dispatch(fetchRecommendation());
      }

    }, [user, history, dispatch]);

    if(!loading){
      dispatch(loadingEndAction());
    }

    return (
        <>
           <div className="container">
              <div className="row">
                <div className="column tab-container">
                 <ProfileTabs />
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
