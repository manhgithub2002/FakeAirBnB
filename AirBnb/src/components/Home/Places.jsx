import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeightSpacer from '../Reusable/HeightSpacer';
import {VirtualizedList} from 'react-native';
import {SIZES} from '../../constants/theme';
import Country from '../Tiles/Country/Country';
import axios from 'axios';

const Places = () => {
  const [countries, setCountries] = useState([]);

  const getPlaces = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5003/api/countries', {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      });
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <View>
      <HeightSpacer height={20} />

      <VirtualizedList
        data={countries}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({item, index}) => (
          <View style={{marginRight: SIZES.medium}}>
            <Country item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Places;
