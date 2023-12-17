import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import reusable from '../../components/Reusable/reuasble.style';
import axios from 'axios';
import {ListBulletIcon} from 'react-native-heroicons/outline';

const CountryDetails = ({navigation}) => {
  const route = useRoute();
  const {id} = route.params;

  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState({});

  const getCountryById = async country_id => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/countries/${country_id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );

      setCountry(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountryById(id);
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
          source={country.imageUrl}
          width={'100%'}
          height={350}
          radius={12}
        />

        <AppBar
          title={country.country}
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
          text={country.region}
          family={'medium'}
          size={TEXT.xLarge}
          color={COLORS.black}
        />

        <DescriptionText text={country.description} lines={6} />

        <View style={{alignContent: 'center'}}>
          <HeightSpacer height={20} />

          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={'Popular Description'}
              family={'medium'}
              size={TEXT.large}
              color={COLORS.black}
            />

            <TouchableOpacity onPress={() => {}}>
              <ListBulletIcon color={COLORS.black} size={20} />
            </TouchableOpacity>
          </View>

          <HeightSpacer height={20} />

          <PopularList data={country.popular} />

          <ReusableBtn
            onPress={() =>
              navigation.navigate('HotelSearch', {id: id, param: 'country'})
            }
            btnText={'Find Beautiful Places'}
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

export default CountryDetails;
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
