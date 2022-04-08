import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

import './ChatScreen.scss';

const ChatScreen = () => {
  return (
    <div className='chat-wrapper'>
      <div>
        <h3>My Chats</h3>
        <div>
          <div className='search'>
            <input type='text' placeholder='Search or start new chat' />
            <SearchOutlined
              style={{
                fontSize: '1rem',
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div>Header</div>
        <div>Chats</div>
        <div>Input</div>
      </div>
    </div>
  );
};

export default ChatScreen;
