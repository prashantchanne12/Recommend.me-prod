import React from 'react';
import './MessageItem.scss';
import dateFormat from 'dateformat';
import { isItMe } from '../config/logic';

const MessageItem = ({ message, userId }) => {
  const isMine = isItMe(message.sender, userId);
  console.log(isMine);

  return (
    <div className='message-item-wrapper' id={isMine ? 'mine' : 'not-mine'}>
      <div className='message-item'>
        <div className='message-body'>{message.content}</div>
        <div className='message-time'>
          {dateFormat(message.createdAt, 'h:MM TT')}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
