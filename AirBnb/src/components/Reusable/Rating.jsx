import {View} from 'react-native';
import React from 'react';
import reusable from './reuasble.style';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import {StarIcon} from 'react-native-heroicons/solid';
import WidthSpacer from './WidthSpacer';
import ReusableText from './ReusableText';

const Rating = ({rating}) => {
  return (
    <View style={reusable.rowWithSpace('flex-start')}>
      <StarIcon size={20} color={'#FD9942'} />
      <WidthSpacer width={5} />

      <ReusableText
        text={rating}
        family={'medium'}
        size={15}
        color={'#FD9942'}
      />
    </View>
  );
};

export default Rating;
