import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import reusable from './reuasble.style';
import {COLORS, TEXT} from '../../constants/theme';
import {
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableText,
  WidthSpacer,
} from '../../components/index';

const ReusableTiles = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace('flex-start')}>
        <NetworkImage
          source={item.imageUrl}
          width={80}
          height={80}
          radius={12}
        />

        <WidthSpacer width={15} />

        <View>
          <ReusableText
            text={item.title}
            family={'medium'}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={8} />

          <ReusableText
            text={item.title}
            family={'medium'}
            size={14}
            color={COLORS.gray}
          />

          <HeightSpacer height={8} />

          <View style={reusable.rowWithSpace('flex-start')}>
            <Rating rating={item.rating} />
            <WidthSpacer width={5} />
            <ReusableText
              text={` (${item.review}) `}
              family={'medium'}
              size={14}
              color={COLORS.gray}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableTiles;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
