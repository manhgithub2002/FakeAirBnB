import {View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {
  ChatTile,
  HeightSpacer,
  ReusableText,
  SearchBar,
} from '../../components';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const Chat = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getConversationsByID = async id => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/conversations/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setConversations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);

      auth().onAuthStateChanged(async user => {
        if (user) {
          setUserInfo(user.uid);
          getConversationsByID(user.uid);
          setLoading(false);
        } else {
          console.log('Fail to get user information!');
        }
      });

      return () => {
        console.log('Tab unfocused');
      };
    });

    return unsubscribe;
  }, [navigation]);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  return (
    <View styles={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <HeightSpacer height={50} />

      <View style={{marginHorizontal: 20}}>
        <View>
          <ReusableText
            text={'Inbox'}
            family={'bold'}
            size={TEXT.xxLarge}
            color={COLORS.black}
          />
        </View>

        {/* <HeightSpacer height={50} />

          <View style={styles.noMesage}>
            <ChatBubbleBottomCenterTextIcon size={26} color={COLORS.black} />

            <HeightSpacer height={20} />

            <ReusableText
              text={'No messages'}
              family={'regular'}
              size={TEXT.xLarge}
              color={COLORS.black}
            />
          </View> */}
        <HeightSpacer height={20} />

        <SearchBar placeholder="Search" />

        <HeightSpacer height={15} />

        <FlatList
          data={conversations}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={{marginBottom: 10}}>
                <ChatTile item={item} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noMesage: {
    alignItems: 'center',
  },
});
export default Chat;
