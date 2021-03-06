import React, { useEffect } from 'react';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import Profile from '../../components/Profile/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../actions/userActions';
import { fetchUserRecommendations } from '../../actions/recommendActions';
import Loading from '../../components/Loading/Loading';

const UserProfile = ({ match, history }) => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userProfile);
  const { loading: followLoading } = useSelector((state) => state.userFollow);
  const { loading: unfollowLoading } = useSelector(
    (state) => state.userUnfollow
  );
  const mySession = useSelector((state) => state.mySession);
  const currentUser = mySession.user;
  const { lists, loading } = useSelector((state) => state.userRecommendations);

  if (user && currentUser) {
    if (currentUser._id === match.params.userId) {
      history.push('/profile');
    }
  }

  useEffect(() => {
    if (!user) {
      dispatch(userProfile(match.params.userId));
    }

    if (!lists) {
      dispatch(fetchUserRecommendations(match.params.userId));
    }
  }, [dispatch, match, user, lists]);

  if (error) {
    setTimeout(() => {
      history.push('/profile');
    }, 3000);
  }

  return user ? (
    <>
      <div className='container'>
        <div className='row'>
          <div className='column tab-container'>
            <ProfileTabs lists={lists} loading={loading} />
          </div>
          <div className='column profile-container'>
            <Profile
              user={user}
              followLoading={followLoading}
              unfollowLoading={unfollowLoading}
            />
          </div>
        </div>
      </div>
    </>
  ) : error ? (
    <div className='container'>User not found</div>
  ) : (
    <Loading />
  );
};

export default UserProfile;
