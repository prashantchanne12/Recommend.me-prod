import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import './ChatScreen.scss';
import ChatItem from './ChatItem/ChatItem';

const ChatScreen = () => {
  const [search, setSearch] = useState('');
  const [placeHolder, setPlaceHolder] = useState(
    '       Search or start new chat'
  );
  const [focus, setFocus] = useState(false);

  return (
    <div className='chat-wrapper'>
      <div className='my-chats-section'>
        <div className='search-wrapper'>
          <div className='search'>
            <input
              className='search-input'
              onFocus={() => {
                setFocus(true);
                setPlaceHolder('ex. John, Logan');
              }}
              onBlur={() => {
                setPlaceHolder('       Search or start new chat');
                setFocus(false);
              }}
              type='text'
              placeholder={placeHolder}
            />
            <div className='search-icon'>{!focus && <SearchOutlined />}</div>
          </div>
        </div>
        <div className='chats'>
          <ChatItem />
          <ChatItem />
        </div>
        <div className='search-results'></div>
      </div>
      <div className='message-section'>
        <div>Header</div>
        <div>Chats</div>
        <div>Input</div>
      </div>
    </div>
  );
};

export default ChatScreen;
