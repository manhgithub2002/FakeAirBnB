import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reuasble.style';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import styles from './search.style';
import {COLORS} from '../../constants/theme';
import {AppBar, HeightSpacer} from '../../components/index';
import HotelCard from '../../components/Tiles/Hotel/HotelCard';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

const HotelSearch = ({navigation}) => {
  const route = useRoute();
  const {id, param} = route.params;
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  const getPlaceByCountryId = async id => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/places/byCountry/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );

      setPlaces(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPropertiesByPlaceId = async id => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/properties/byPlace/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );

      setPlaces(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (param == 'country') {
      getPlaceByCountryId(id);
    } else {
      getPropertiesByPlaceId(id);
    }
  }, []);
  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  return (
    <SafeAreaView>
      <View style={{height: 50}}>
        <AppBar
          title={'Look for hotels'}
          color={COLORS.white}
          color1={COLORS.white}
          icon={'filter'}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={10}
          left={20}
          right={20}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.input}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Where do you want to visit"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <MagnifyingGlassIcon size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {places.length === 0 ? (
        <View>
          <HeightSpacer height={'20%'} />
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <View style={{paddingLeft: 12}}>
          <FlatList
            data={places}
            keyExtractor={item => item.id}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
            renderItem={({item}) => (
              <HotelCard
                item={item}
                onPress={() => navigation.navigate('PlaceDetails', item.id)}
                margin={10}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HotelSearch;
