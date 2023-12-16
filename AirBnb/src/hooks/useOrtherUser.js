import firestore from '@react-native-firebase/firestore';
import {getOrtherID} from '../utils/getOtherID';

export const useOrtherUser = async (conversationUsers, loggedInUser) => {
  // get orther id
  const ortherID = getOrtherID(conversationUsers, loggedInUser);

  // get recipient avatar and name
  const ortherUserSnapshot = await firestore()
    .collection('users')
    .doc(ortherID)
    .get();
  // recipientSnapshot?.docs could be an empty array, leading to docs[0] being undefined
  // so we have to force "?" after docs[0] because there is no data() on "undefined"
  const ortherUser = ortherUserSnapshot?.docs[0]?.data();

  return {
    ortherUser,
  };
};
