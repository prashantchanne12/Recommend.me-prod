import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Loader from 'react-loader-spinner';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ChatScreen.scss';
import ChatItem from './ChatItem/ChatItem';
import { getChatAction } from '../../actions/chatActions';
import MessageSection from './MessageSection/MessageSection';

import io from 'socket.io-client';
import axios from 'axios';
import UserItem from './UserItem/UserItem';

// const socket = io.connect('http://localhost:5000');
const socket = io.connect('https://new-recommend-me.herokuapp.com');

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const ChatScreen = () => {
  const [search, setSearch] = useState('');
  const [placeHolder, setPlaceHolder] = useState(
    '       Search or start new chat'
  );
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [chat, setSelectedChat] = useState();

  const debouncedSearchTerm = useDebounce(search, 500);

  const dispatch = useDispatch();
  const { chats, loading: chatLoading } = useSelector((state) => state.chats);
  const mySession = useSelector((state) => state.mySession);
  const currentUser = mySession.user;

  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post('/api/chat', { userId }, config);
      dispatch(getChatAction());
      setSearch('');
      socket.emit('join_room', data._id);
      setSelectedChat(data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchUser = async (searchTerm) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        '/api/search/profile',
        { query: searchTerm },
        config
      );

      setSearchedUsers(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getChatAction());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      setShowSearchResult(true);
    } else {
      setShowSearchResult(false);
    }
  }, [search]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchUser(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

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
                if (!search) {
                  setPlaceHolder('       Search or start new chat');
                  setFocus(false);
                }
              }}
              type='text'
              placeholder={placeHolder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='search-icon'>{!focus && <SearchOutlined />}</div>
          </div>
        </div>
        {!showSearchResult ? (
          <div className='chats'>
            {chatLoading ? (
              <Loader
                type='Oval'
                height={35}
                width={35}
                color='#0984e3'
                className='chat-loading'
              />
            ) : (
              chats?.map((chat) => (
                <div
                  className='chat-item-wrapper'
                  key={chat._id}
                  onClick={() => {
                    socket.emit('join_room', chat._id);
                    setSelectedChat(chat);
                  }}
                >
                  <ChatItem
                    chat={chat}
                    chatId={chat._id}
                    userId={currentUser._id}
                  />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className='search-results'>
            {loading ? (
              <div
                style={{
                  marginTop: '4rem',
                }}
              >
                <Loader
                  type='Oval'
                  height={35}
                  width={35}
                  color='#0984e3'
                  className='chat-loading'
                />
              </div>
            ) : (
              <div
                style={{
                  marginTop: '3rem',
                }}
              >
                {searchedUsers.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    accessChat={accessChat}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {chat ? (
        <div className='message-section'>
          <MessageSection
            socket={socket}
            chat={chat}
            userId={currentUser._id}
          />
        </div>
      ) : (
        <div className='empty-chat'></div>
      )}
    </div>
  );
};

export default ChatScreen;

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
