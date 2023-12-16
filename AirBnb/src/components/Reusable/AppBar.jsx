import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import reusable from '../../components/Reusable/reuasble.style';
import {TouchableOpacity} from 'react-native';
import {COLORS, TEXT} from '../../constants/theme';
import * as Icons from 'react-native-heroicons/outline';
import ReusableText from './ReusableText';

const AppBar = ({
  color,
  title,
  color1,
  icon,
  onPress,
  onPress1,
  top,
  left,
  right,
  sticky,
}) => {
  return (
    <View style={styles.overlay(top, left, right, sticky)}>
      <View style={reusable.rowWithSpace('space-between')}>
        <TouchableOpacity style={styles.box(color)} onPress={onPress}>
          <Icons.ChevronLeftIcon color={COLORS.black} size={26} />
        </TouchableOpacity>

        <ReusableText
          text={title}
          family={'medium'}
          size={TEXT.medium}
          color={COLORS.black}
        />

        <TouchableOpacity style={styles.box1(color1)} onPress={onPress1}>
          <Icons.MagnifyingGlassIcon color={COLORS.black} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  overlay: (top, left, right, sticky) => ({
    position: 'absolute',
    top: top,
    left: left,
    right: right,
    justifyContent: 'center',
    backgroundColor: sticky,
    height: 60,
  }),
  box: color => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  box1: color1 => ({
    backgroundColor: color1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
