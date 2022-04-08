import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircleOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';

import './header.scss';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import { useDispatch, useSelector } from 'react-redux';
import { profileToggle, profileToggleReset } from '../../actions/userActions';
import {
  NOTIFICATION_TOGGLE_REQUEST,
  NOTIFICATION_TOGGLE_RESET,
} from '../../constants/userConstants';
import SearchBar from '../SearchBar/SearchBar';
import Notification from '../Notification/Notification';
import { readAllNotifications } from '../../actions/notificationActions';

function Header() {
  const dispatch = useDispatch();

  const { toggle } = useSelector((state) => state.profileToggle);
  const { toggle: notificationToggle } = useSelector(
    (state) => state.notificationToggle
  );
  const { notifications: userNotifications } = useSelector(
    (state) => state.notifications
  );

  let notifications = null;

  if (userNotifications) {
    notifications = userNotifications.notifications;
  }

  let notificationCount = notifications
    ? notifications.filter((item) => item.seen === false).length
    : 0;
  const [tempShow, setTempShow] = useState(true);

  return (
    <div className='header'>
      <div className='header-container'>
        <Link to='/'>
          <h3 className='title'>Recommend.me</h3>
        </Link>

        <SearchBar />

        <div
          className='options-container'
          style={{
            position: 'relative',
          }}
        >
          <div className='options'>
            {/* <Link to='/' className='link'>
                            <RiSearchLine className='header-icon' />
                        </Link> */}

            <div className='link'>
              <div
                className='notification'
                onClick={() => {
                  if (notificationToggle) {
                    dispatch({ type: NOTIFICATION_TOGGLE_RESET });
                  } else {
                    setTempShow(false);
                    dispatch({ type: NOTIFICATION_TOGGLE_REQUEST });
                    dispatch(readAllNotifications());
                  }
                }}
              >
                <BellOutlined className='header-icon' />
              </div>
              <div
                className='notification-count'
                style={{
                  padding: `${
                    String(notificationCount).length > 1 ? '2px 4px' : '0px 7px'
                  } `,
                }}
              >
                {notificationCount > 0 && tempShow && notificationCount}
              </div>

              {notificationToggle && (
                <div className='notification-result'>
                  {notifications && notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Notification
                        notification={notification}
                        key={notification._id}
                      />
                    ))
                  ) : (
                    <div>No Notifications for now</div>
                  )}
                </div>
              )}
            </div>

            <Link to='/create' className='link'>
              <PlusCircleOutlined className='header-icon' />
            </Link>
            <div
              className='link'
              onClick={() =>
                toggle
                  ? dispatch(profileToggleReset())
                  : dispatch(profileToggle())
              }
            >
              <UserOutlined className='header-icon' />
            </div>
          </div>
          {toggle && <ProfileOptions />}
        </div>
      </div>
    </div>
  );
}

export default Header;
