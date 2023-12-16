import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  HeightSpacer,
  PropertyCalenderTiles,
  ReusableText,
} from '../../../components';
import {COLORS, TEXT} from '../../../constants/theme';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const Calender = ({navigation}) => {
  const date = new Date();

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Descember',
  ];
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const getPropertiesByHost = async user_id => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://10.0.2.2:5003/api/properties/byHost/${user_id}`,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(user => {
      if (user) {
        getPropertiesByHost(user.uid);
      } else {
        console.log('Fail to get user information!');
      }
    });
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  return (
    <View styles={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView>
        <HeightSpacer height={50} />

        <View style={{marginHorizontal: 20}}>
          <View>
            <ReusableText
              text={'Calendar'}
              family={'bold'}
              size={TEXT.xxLarge}
              color={COLORS.black}
            />
          </View>

          <HeightSpacer height={50} />

          <ReusableText
            text={`${month[date.getMonth()]} ${date.getFullYear()}`}
            family={'bold'}
            size={TEXT.large}
            color={COLORS.black}
          />

          <HeightSpacer height={30} />

          {properties.map(item => (
            <PropertyCalenderTiles
              item={item}
              onPress={() =>
                navigation.navigate('CalenderDetails', {
                  id: item.docId,
                  title: item.title,
                })
              }
            />
          ))}

          <HeightSpacer height={100} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Calender;
