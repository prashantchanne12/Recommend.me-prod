import mongoose from 'mongoose';

const userRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
};

const messageRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Message',
};

const chatModel = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [userRef],
    latestMessage: messageRef,
    groupAdmin: userRef,
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatModel);

export default Chat;
