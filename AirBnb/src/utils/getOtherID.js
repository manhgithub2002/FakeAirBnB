export const getOrtherID = (conversationUsers, loggedInUser) =>
  conversationUsers.find(userId => userId !== loggedInUser);
