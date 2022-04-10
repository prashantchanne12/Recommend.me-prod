import React from 'react';
import './ChatItem.scss';
import dateFormat from 'dateformat';
import { getSender } from '../config/logic';

const ChatItem = ({ chat, chatId, userId }) => {
  const user = getSender(chat.users, userId);

  return (
    <>
      <div className='chat-item'>
        <div className='img-wrapper'>
          <img src={user.image} alt='Logan profile' />
        </div>
        <div className='meta'>
          <div className='meta-1'>
            <p className='name'>{user.displayName}</p>
            <p className='time'>
              {dateFormat(chat?.latestMessage?.createdAt, 'h:MM TT')}
            </p>
          </div>
          <p className='last-msg'>{chat.latestMessage?.content}</p>
        </div>
      </div>
      {/* <hr className='chat-hr' /> */}
    </>
  );
};

export default ChatItem;
