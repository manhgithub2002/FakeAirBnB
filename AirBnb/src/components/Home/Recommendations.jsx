import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import reusable from '../Reusable/reuasble.style';
import {TouchableOpacity} from 'react-native';
import {ListBulletIcon} from 'react-native-heroicons/outline';
import {FlatList} from 'react-native';
import {COLORS, TEXT, SIZES} from '../../constants/theme';
import ReusableTiles from '../Reusable/ReusableTiles';
import ReusableText from '../Reusable/ReusableText';
import axios from 'axios';

const Recommendations = () => {
  const navigation = useNavigation();
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:5003/api/places/recommendations/4',
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
    getRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[reusable.rowWithSpace('space-between'), {paddingBottom: 20}]}>
        <ReusableText
          text={'Recommendations'}
          family={'medium'}
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Recommended', {params: 'place'})}>
          <ListBulletIcon color={COLORS.black} size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recommendations}
        horizontal
        keyExtractor={item => item.id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ReusableTiles
            item={item}
            onPress={() => navigation.navigate('PlaceDetails', {id: item.id})}
          />
        )}
      />
    </View>
  );
};

export default Recommendations;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});
