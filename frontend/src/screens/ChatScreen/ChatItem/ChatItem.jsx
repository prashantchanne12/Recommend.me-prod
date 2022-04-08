import React from 'react';
import './ChatItem.scss';

const ChatItem = () => {
  return (
    <div>
      <div className='chat-item'>
        <div className='img-wrapper'>
          <img
            src='https://i.pinimg.com/550x/a7/5e/9e/a75e9e35a8ed1ccc1017db40438c60e9.jpg'
            alt='Logan profile'
          />
        </div>
        <div className='meta'>
          <div>
            <p className='name'>Logan Paul</p>
            <p className='time'>12:00pm</p>
          </div>
          <p className='last-msg'>This is the last message</p>
        </div>
      </div>
      <hr className='chat-hr' />
    </div>
  );
};

export default ChatItem;
