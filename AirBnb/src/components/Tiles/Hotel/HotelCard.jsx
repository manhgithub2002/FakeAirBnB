import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, SIZES, TEXT} from '../../../constants/theme';
import {
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableText,
} from '../../../components/index';
const HotelCard = ({item, margin, onPress}) => {
  return (
    <TouchableOpacity style={styles.card(margin)} onPress={onPress}>
      <View>
        <View style={styles.imageContainer}>
          <NetworkImage
            source={item.imageUrl}
            width={'90%'}
            height={'100%'}
            radius={16}
          />
        </View>

        <HeightSpacer height={5} />

        <View style={{padding: 10}}>
          <ReusableText
            text={item.title}
            lines={1}
            family={'medium'}
            size={SIZES.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={5} />

          <ReusableText
            text={item.location}
            family={'medium'}
            size={SIZES.medium}
            color={COLORS.gray}
            lines={1}
          />

          <HeightSpacer height={5} />

          <Rating rating={item.rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  card: margin => ({
    width: SIZES.width / 2.2,
    height: 250,
    borderRadius: 16,
    backgroundColor: COLORS.lightWhite,
    marginRight: margin,
  }),
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    height: 150,
  },
});
