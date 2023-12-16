import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import reusable from '../Reusable/reuasble.style';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import ReusableText from '../Reusable/ReusableText';
import HeightSpacer from '../Reusable/HeightSpacer';
import WidthSpacer from '../Reusable/WidthSpacer';

const MessageTile = ({item, isLoggedIn}) => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={styles.container(isLoggedIn)}>
        <View style={styles.message(isLoggedIn)}>
          <ReusableText
            text={item.text}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      </View>
    </View>
  );
};

export default MessageTile;

const styles = StyleSheet.create({
  container: isLoggedIn => ({
    flexDirection: 'row',
    justifyContent: isLoggedIn == true ? 'flex-end' : 'flex-start',
  }),
  date: {
    alignItems: 'center',
  },
  avatar: {
    resizeMode: 'cover',
    width: 48,
    height: 48,
    borderColor: COLORS.red,
    borderWidth: 2,
    borderRadius: 90,
  },
  message: isLoggedIn => ({
    backgroundColor: isLoggedIn == true ? COLORS.red : COLORS.lightGrey,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'flex-start',
  }),
});
