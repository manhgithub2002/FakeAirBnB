import {View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../../constants/theme';
import {
  HeightSpacer,
  NetworkImage,
  ReusableText,
} from '../../../components/index';
import {useNavigation} from '@react-navigation/native';

const Country = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CountryDetails', {id: item.id})}>
      <View>
        <NetworkImage
          source={item.imageUrl}
          width={85}
          height={85}
          radius={12}
        />

        <HeightSpacer height={5} />

        <ReusableText
          text={item.country}
          family={'medium'}
          size={SIZES.medium}
          color={COLORS.black}
          align={'center'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Country;
