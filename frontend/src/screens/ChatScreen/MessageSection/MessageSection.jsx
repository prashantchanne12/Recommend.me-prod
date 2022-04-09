import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSender } from '../config/logic';
import MessageItem from '../MessageItem/MessageItem';
import './MessageSection.scss';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageSection = ({ chat, userId }) => {
  const user = getSender(chat.users, userId);
  const [messages, setMessages] = useState([]);
  const mySession = useSelector((state) => state.mySession);
  const currentUser = mySession.user;
  const [message, setMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`/api/message/${chat._id}`);
      setMessages(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (!message) {
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      setMessage('');

      const { data } = await axios.post(
        '/api/message',
        {
          chatId: chat._id,
          content: message,
        },
        config
      );

      console.log(data);

      setMessages([...messages, data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className='message-section-wrapper'>
      <div className='chat-header-wrapper'>
        <div className='chat-header'>
          <div className='chat-user-image'>
            <img src={user.image} alt={user.displayName} />
          </div>
          <div className='chat-user-name'>{user.displayName}</div>
        </div>
      </div>
      <div>
        <ScrollToBottom className='message-section-body'>
          {messages.map((msg) => (
            <MessageItem key={msg._id} message={msg} userId={currentUser._id} />
          ))}
        </ScrollToBottom>
      </div>
      <div className='message-input'>
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type='text'
          placeholder='Type a message...'
          required
        />
      </div>
    </div>
  );
};

export default MessageSection;
