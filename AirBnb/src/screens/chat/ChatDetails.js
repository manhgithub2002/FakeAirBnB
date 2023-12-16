import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as Icons from 'react-native-heroicons/outline';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {MessageTile, ReusableText, WidthSpacer} from '../../components';
import reusable from '../../components/Reusable/reuasble.style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {transfromMessage} from '../../utils/getMessageInConversation';

const ChatDetails = ({navigation}) => {
  const route = useRoute();
  const {id, users} = route.params;

  const [loading, setLoading] = useState(true);
  const [conID, setConID] = useState(id);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [otherUser, setOtherUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const flatListRef = useRef(null);

  const getUserInfo = async id => {
    const docRef = firestore().collection('users').doc(id);
    const docSnap = await docRef.get();

    userTemp = docSnap.data();
    userTemp.id = id;

    return userTemp;
  };

  const addMessageToDb = async data => {
    try {
      await axios.post(
        `http://10.0.2.2:5003/api/conversations/addMessage`,
        data,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );

      setValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async text => {
    // If is new conversation
    if (conID === '') {
      const ref = await firestore().collection('conversations').add({
        users: users,
      });
      setConID(ref.id);

      const data = {
        conversation_id: ref.id,
        text: text,
        user: loggedInUser.id,
      };

      if (value.length < 0) {
        return;
      } else {
        await addMessageToDb(data);
      }
    }

    // Conversation has existed
    const data = {
      conversation_id: conID,
      text: text,
      user: loggedInUser.id,
    };
    if (value.length < 0) {
      return;
    } else {
      await addMessageToDb(data);
    }
  };

  useEffect(() => {
    console.log(conID);
    setLoading(true);

    //Check conversation is existed
    if (conID !== '') {
      console.log('1');
      // get messages and listen for changes
      const collectionRef = firestore().collection('messages');
      const query = collectionRef
        .where('conversation_id', '==', conID)
        .orderBy('sent_at', 'asc');

      const unMessageSub = query.onSnapshot(snapshot => {
        // Handle changes in the 'messages' collection
        const updatedMessages = snapshot.docs.map(doc => transfromMessage(doc));
        setMessages(updatedMessages);
      });
    }

    const unAuthSub = auth().onAuthStateChanged(async user => {
      if (user) {
        //get logged in user information
        setLoggedInUser(await getUserInfo(user.uid));

        //get logged in user information
        otherID = users.find(id => id !== user.uid);
        setOtherUser(await getUserInfo(otherID));
      } else {
        console.log('Fail to get user information!');
      }
    });
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
    setLoading(false);

    return () => {
      unAuthSub();
      // if (id !== null) unMessageSub();
    };
  }, [conID]);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{flex: 1}}
      keyboardVerticalOffset={50}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={reusable.rowWithSpace('space-between')}>
            <View style={reusable.rowWithSpace('flex-start')}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons.ChevronLeftIcon size={26} color={COLORS.red} />
              </TouchableOpacity>

              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg',
                }}
                style={styles.avatar}
              />

              <WidthSpacer width={5} />

              <ReusableText
                text={otherUser.fullname}
                family={'medium'}
                size={TEXT.medium}
                color={COLORS.black}
              />
            </View>

            <View>
              <Icons.EllipsisHorizontalIcon size={26} color={COLORS.black} />
            </View>
          </View>
        </View>
        <View style={styles.content_container}>
          {conID !== '' ? (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <View style={styles.item_container}>
                    {item.user == loggedInUser.id ? (
                      <MessageTile
                        item={item}
                        name={loggedInUser.fullname}
                        isLoggedIn={true}
                      />
                    ) : (
                      <MessageTile
                        item={item}
                        name={otherUser.fullname}
                        isLoggedIn={false}
                      />
                    )}
                  </View>
                );
              }}
              onContentSizeChange={() => {
                flatListRef.current.scrollToEnd({animated: true});
              }}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={styles.bottom}>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              placeholder={'Write a message'}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => sendMessage(value)}>
              <Icons.PaperAirplaneIcon color={COLORS.red} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 2,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.lightWhite,
    shadowColor: COLORS.black,
    shadowOffset: {height: 8},
    shadowOpacity: 0.05,
    paddingBottom: 8,
    shadowRadius: 4,
  },
  left_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content_container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  item_container: {
    marginTop: 20,
  },
  message_system: {
    backgroundColor: COLORS.red,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 32,
    borderRadius: 12,
  },
  message_customer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    resizeMode: 'cover',
    width: 48,
    height: 48,
    borderColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 90,
  },
  bottom: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
  },
  textWrapper: {
    width: (SIZES.width * 4.3) / 5,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      height: -8,
    },
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderRadius: 12,
    height: 50,
    borderColor: COLORS.black,
  },
  input: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    color: COLORS.black,
  },
  button: {
    width: (SIZES.width * 0.7) / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
