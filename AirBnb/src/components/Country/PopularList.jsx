import {FlatList, View} from 'react-native';
import React from 'react';
import ReusableTiles from '../Reusable/ReusableTiles';
import {useNavigation} from '@react-navigation/native';

const PopularList = ({data, param}) => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={{marginBottom: 10}}>
      <ReusableTiles
        item={item}
        onPress={() =>
          navigation.navigate(
            param === 'place' ? 'HotelDetails' : 'PlaceDetails',
            {id: item.id},
          )
        }
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default PopularList;
