import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  NetworkImage,
  AppBar,
  ReusableText,
  DescriptionText,
  ReusableBtn,
  PopularList,
  HeightSpacer,
} from '../../components/index';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {ListBulletIcon} from 'react-native-heroicons/outline';
import reusable from '../../components/Reusable/reuasble.style';
import axios from 'axios';

const PlaceDetails = ({navigation}) => {
  const route = useRoute();
  const {id} = route.params;

  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({});

  const getPlaceById = async id => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/places/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setPlace(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaceById(id);
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  return (
    <ScrollView>
      <View>
        <NetworkImage
          source={place.imageUrl}
          width={'100%'}
          height={350}
          radius={30}
        />

        <AppBar
          title={place.title}
          color={COLORS.white}
          color1={COLORS.white}
          icon={'search1'}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={40}
          left={20}
          right={20}
        />
      </View>

      <View style={styles.description}>
        <ReusableText
          text={place.location}
          family={'medium'}
          size={TEXT.xLarge}
          color={COLORS.black}
        />

        <DescriptionText text={place.description} lines={6} />

        <View style={{alignContent: 'center'}}>
          <HeightSpacer height={20} />

          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={'Popular Hotels'}
              family={'medium'}
              size={TEXT.large}
              color={COLORS.black}
            />

            <TouchableOpacity onPress={() => {}}>
              <ListBulletIcon size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <HeightSpacer height={20} />

          <PopularList data={place.popular} param={'place'} />

          <ReusableBtn
            onPress={() =>
              navigation.navigate('HotelSearch', {id: id, param: 'place'})
            }
            btnText={'Find Best Hotel'}
            width={SIZES.width - 40}
            backgroundColor={COLORS.green}
            boderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F8',
    marginHorizontal: 20,
  },
  description: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
});
