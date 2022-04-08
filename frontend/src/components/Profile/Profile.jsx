import React from 'react';
import './profile.scss';
import {
  MessageOutlined,
  UserDeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import {
  followUser,
  unfollowUser,
  changeUserNameCard,
} from '../../actions/userActions';
import {
  removeFollowNotification,
  sendFollowNotification,
} from '../../actions/notificationActions';
import Loading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';

const Profile = ({ user, followLoading, unfollowLoading }) => {
  const dispatch = useDispatch();
  const mySession = useSelector((state) => state.mySession);
  const currentUser = mySession.user;
  let isUserProfile = null;
  let amIFollowing = null;
  const history = useHistory();

  if (currentUser && user) {
    isUserProfile = currentUser._id !== user._id;
    amIFollowing = user.followers.find((id) => id === currentUser._id);
  }

  const body = {
    ownerId: user && user._id,
    userName: currentUser && currentUser.displayName,
    userProfileImg: currentUser && currentUser.image,
  };

  return user ? (
    <>
      <div className='profile-box'>
        <div className='profile-header'>
          <div className='profile-image'>
            <img src={user.image} alt='' />
          </div>
          <div className='name-section'>
            <div className='display-name'>
              <p className='f-name'>{user.firstName}</p>
              <p className='l-name'>{user.lastName}</p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div className='user-name'>
                <p>{user.userName}</p>
              </div>
              {!isUserProfile && (
                <EditOutlined
                  onClick={() => {
                    dispatch(changeUserNameCard());
                  }}
                  style={{
                    paddingLeft: '5px',
                    cursor: 'pointer',
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className='hr' />
        <div className='counts'>
          <div className='count'>
            <p>Recommendations</p>
            <p className='count-number'>{user.recommendations.length}</p>
          </div>
          <div className='count'>
            <p>Following</p>
            <p className='count-number'>{user.followings.length}</p>
          </div>
          <div className='count'>
            <p>Followers</p>
            <p className='count-number'>{user.followers.length}</p>
          </div>
        </div>
        {isUserProfile && <div className='hr' />}
        <div className='bottom-actions'>
          {isUserProfile ? (
            <div
              className='follow-unfollow'
              style={{
                cursor:
                  followLoading || unfollowLoading ? 'progress' : 'pointer',
                display: 'inline-block',
              }}
            >
              {amIFollowing ? (
                <div
                  className='connect unfollow-icon'
                  onClick={() => {
                    dispatch(unfollowUser(user._id));
                    dispatch(removeFollowNotification({ ownerId: user._id }));
                  }}
                >
                  <UserDeleteOutlined size={20} />
                  {/* <BiUnlink className='icon' /> */}
                </div>
              ) : (
                <div
                  className='connect'
                  onClick={() => {
                    dispatch(followUser(user._id));
                    dispatch(sendFollowNotification(body));
                  }}
                >
                  <p className='follow'>Follow</p>
                  {/* <BiLink className='icon' /> */}
                </div>
              )}
            </div>
          ) : null}

          {amIFollowing && (
            <MessageOutlined
              className='msg-icon'
              size={22}
              onClick={() => history.push('/chats')}
            />
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Profile;
