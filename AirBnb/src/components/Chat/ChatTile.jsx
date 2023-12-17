import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import ReusableText from '../Reusable/ReusableText';

const ChatTile = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatDetails', {id: item.id, users: item.users})
      }>
      <View style={styles.container}>
        <View style={styles.left_item}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg',
            }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <ReusableText
              text={item.otherUserInfo.fullname}
              family={'regular'}
              size={TEXT.medium}
              color={COLORS.black}
            />
            <ReusableText
              text={'Hello meo ngu nhu cho'}
              family={'regular'}
              size={TEXT.small}
              color={COLORS.gray}
            />
          </View>
        </View>

        <View style={styles.right_item}>
          <ReusableText
            text={'5:30'}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <View style={styles.unread}></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatTile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightWhite,
    height: 80,
    borderRadius: 12,
  },
  left_item: {
    flexDirection: 'row',
  },
  avatar: {
    resizeMode: 'cover',
    width: 58,
    height: 58,
    borderColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 90,
  },
  info: {
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginLeft: 10,
  },
  name: {
    fontSize: SIZES.medium,
  },

  right_item: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  unread: {
    height: 9,
    width: 9,
    borderRadius: 5,
    backgroundColor: COLORS.lightBlue,
  },
});
