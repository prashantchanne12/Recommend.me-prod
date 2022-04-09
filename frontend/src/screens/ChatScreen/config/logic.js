export const getSender = (users, id) => {
  if (users[0]._id === id) {
    return users[1];
  }
  return users[0];
};

export const isItMe = (sender, id) => {
  if (sender._id === id) {
    return true;
  }
  return false;
};
