import mongoose from 'mongoose';

const userRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
};

const chatRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Chat',
};

const messageModel = mongoose.Schema(
  {
    sender: userRef,
    content: {
      type: String,
      trim: true,
    },
    chat: chatRef,
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model('Message', messageModel);

export default Message;
