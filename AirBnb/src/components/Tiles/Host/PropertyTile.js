import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../../constants/theme';
import {HeightSpacer, ReusableText} from '../../../components/index';
import {useNavigation} from '@react-navigation/native';
import reusable from '../../Reusable/reuasble.style';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

const PropertyTiles = ({num, user_id}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style.box}
      onPress={() =>
        navigation.navigate('ListProperties', {num: num, user_id: user_id})
      }>
      <View style={reusable.rowWithSpace('space-between')}>
        <ReusableText
          text={`${num} listing`}
          family={'medium'}
          size={SIZES.medium}
          color={COLORS.black}
          align={'center'}
        />

        <ChevronRightIcon color={COLORS.gray} size={24} />
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  box: {
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    height: 60,
    justifyContent: 'center',
    padding: 10,
  },
});
export default PropertyTiles;
