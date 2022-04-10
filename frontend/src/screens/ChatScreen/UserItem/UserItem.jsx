import React from 'react';
import './UserItem.scss';

const UserItem = ({ user, accessChat }) => {
  return (
    <div
      className='user-item-wrapper'
      onClick={() => {
        accessChat(user._id);
      }}
    >
      <div className='img-wrapper'>
        <img src={user.image} alt='img' />
      </div>
      <div className='meta'>
        <div className='user-display-name'>{user.displayName}</div>
        <div className='user-user-name'>{user.userName}</div>
      </div>
    </div>
  );
};

export default UserItem;
