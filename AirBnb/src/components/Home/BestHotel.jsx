import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ListBulletIcon} from 'react-native-heroicons/outline';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {TouchableOpacity} from 'react-native';
import ReusableText from '../Reusable/ReusableText';
import reusable from '../Reusable/reuasble.style';
import {useNavigation} from '@react-navigation/native';
import HotelCard from '../Tiles/Hotel/HotelCard';
import axios from 'axios';

const BestHotel = () => {
  const navigation = useNavigation();

  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:5003/api/properties/best/4',
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(info);

    getProperties();
  }, []);

  return (
    <View>
      <View
        style={[reusable.rowWithSpace('space-between'), {paddingBottom: 20}]}>
        <ReusableText
          text={'Best Hotel Nearby'}
          family={'medium'}
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Recommended', {params: 'hotel'})}>
          <ListBulletIcon color={COLORS.black} size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties}
        horizontal
        keyExtractor={item => item.id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <HotelCard
            item={item}
            margin={10}
            onPress={() => {
              navigation.navigate('HotelDetails', {id: item.id});
            }}
          />
        )}
      />
    </View>
  );
};

export default BestHotel;
