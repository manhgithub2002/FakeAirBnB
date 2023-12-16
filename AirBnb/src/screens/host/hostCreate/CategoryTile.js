import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../constants/theme';
import {ReusableText} from '../../../components';

const CategoryTile = ({item, margin, onPress, selected}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card(margin),
        {borderColor: selected ? COLORS.black : COLORS.lightGrey},
      ]}
      onPress={onPress}>
      <View style={{padding: 10}}>
        <ReusableText
          text={item}
          lines={1}
          family={'medium'}
          size={SIZES.medium}
          color={COLORS.black}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryTile;

const styles = StyleSheet.create({
  card: (margin, selected) => ({
    width: (SIZES.width - 40 - 10) / 2,
    height: 70,
    borderRadius: 16,
    backgroundColor: COLORS.lightWhite,
    marginRight: margin,
    borderColor: COLORS.lightGrey,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
