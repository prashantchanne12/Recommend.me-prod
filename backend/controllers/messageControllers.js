import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    res.status(400);
    throw new Error('Invalid data passed to request');
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    const updatedMessage = await Message.findById(message._id).populate(
      'sender',
      'displayName userName image'
    );

    // message = await message.populate('sender', 'displayName userName image');

    // message = await message.populate('chat');

    // message = await User.populate(message, {
    //   path: 'chat.users',
    //   select: 'displayName userName image',
    // });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.status(201).send(updatedMessage);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

export const allMessages = asyncHandler(async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'displayName userName image')
      .populate('chat');

    res.status(200).send(message);
  } catch (err) {
    throw new Error(err.message);
  }
});
