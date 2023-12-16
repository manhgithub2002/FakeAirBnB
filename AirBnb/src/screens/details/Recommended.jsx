import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../components/Reusable/AppBar';
import {COLORS, SIZES} from '../../constants/theme';
import {FlatList} from 'react-native';
import ReusableTiles from '../../components/Reusable/ReusableTiles';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const Recommended = ({navigation}) => {
  const route = useRoute();
  const params = route.params;
  console.log(params);
  const [recommendations, setRecommendations] = useState([]);
  const [title, setTitle] = useState();
  const getPlaceRecommendations = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:5003/api/places/recommendations/10',
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setRecommendations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHotelRecommendations = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:5003/api/properties/best/10',
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setRecommendations(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.params == 'place') {
      getPlaceRecommendations();
      setTitle('Place recommendations');
    } else {
      getHotelRecommendations();
      setTitle('Hotel List');
    }
  }, []);
  return (
    <SafeAreaView style={{marginHorizontal: 20}}>
      <View style={{height: 50}}>
        <AppBar
          title={title}
          color={COLORS.white}
          color1={COLORS.white}
          icon={'search1'}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Search')}
          top={10}
          left={0}
          right={0}
        />
      </View>

      <View style={{paddingTop: 20}}>
        <FlatList
          data={recommendations}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              {params.params == 'place' ? (
                <ReusableTiles
                  item={item}
                  onPress={() =>
                    navigation.navigate('PlaceDetails', {id: item.id})
                  }
                />
              ) : (
                <ReusableTiles
                  item={item}
                  onPress={() =>
                    navigation.navigate('HotelDetails', {id: item.id})
                  }
                />
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Recommended;
