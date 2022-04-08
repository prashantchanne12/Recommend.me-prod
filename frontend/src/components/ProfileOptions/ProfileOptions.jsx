import React from 'react';
import './profileOptions.scss';
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { profileToggleReset, userLogout } from '../../actions/userActions';

const ProfileOptions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.mySession);
  const history = useHistory();

  return (
    <>
      <div className='profile-options-container'>
        <div className='profile-options'>
          <Link
            to='/profile'
            className='profile'
            onClick={() => dispatch(profileToggleReset())}
          >
            <p>Profile</p>
            <UserOutlined className='icon' />
          </Link>
          <div className='hr'></div>

          {user ? (
            <div
              className='profile-logout'
              onClick={() => {
                dispatch(userLogout());
                dispatch(profileToggleReset());
                setTimeout(() => {
                  history.push('/login');
                }, 1000);
              }}
            >
              <p>Logout</p>
              <LogoutOutlined className='icon' />
            </div>
          ) : (
            <Link
              to='/login'
              className='profile-login'
              onClick={() => dispatch(profileToggleReset())}
            >
              <p>Login</p>
              <LoginOutlined className='icon' />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileOptions;
