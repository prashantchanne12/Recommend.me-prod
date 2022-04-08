import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';

const userDataExcept =
  '-recommendations -upvotedRecommendations -bucket -followers -followings -loginMethod -firstName -lastName';

// @desc Fetch chats of the user
// @route /api/chat/
// @access Private
export const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', userDataExcept)
      .populate('groupAdmin', userDataExcept)
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'displayName userName image',
        });
        res.send(results);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

// @desc Access or start a new chat with user
// @route /api/chat/
// @access Private
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log('UserId param not sent with request');
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', userDataExcept)
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'displayName userName image',
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'users',
        userDataExcept
      );
      res.status(200).send(FullChat);
    } catch (err) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
