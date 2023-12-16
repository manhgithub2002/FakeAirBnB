import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  AppBar,
  HeightSpacer,
  PropertiesTiles,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {COLORS, SIZES} from '../../constants/theme';
import {useRoute} from '@react-navigation/native';
import reusable from '../../components/Reusable/reuasble.style';
import {PlusIcon} from 'react-native-heroicons/outline';
import axios from 'axios';

const ListProperties = ({navigation}) => {
  const route = useRoute();
  const {num, user_id} = route.params;

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
    setLoading(true);
    getPropertiesByHost(user_id);
    setLoading(false);
  }, [properties]);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <ScrollView>
      <View style={{height: 80}}>
        <AppBar
          color={COLORS.white}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={20}
          left={20}
          right={20}
        />
      </View>

      <View style={{marginHorizontal: 20}}>
        <ReusableText
          text={`${num} listing`}
          family={'bold'}
          size={SIZES.xLarge}
          color={COLORS.black}
        />

        <HeightSpacer height={30} />

        <ReusableText
          text={`Listed`}
          family={'bold'}
          size={SIZES.large}
          color={COLORS.black}
        />
        <HeightSpacer height={15} />
        {num == '0' ? (
          <ReusableText
            text={`You don't have any property. Start to create it!`}
            family={'regular'}
            size={SIZES.medium}
            color={COLORS.lightGrey}
          />
        ) : null}
        <View>
          {properties.map(item => (
            <View style={{marginBottom: 12}}>
              <PropertiesTiles
                item={item}
                onPress={() =>
                  navigation.navigate('HotelDetails', {id: item.docId})
                }
              />
            </View>
          ))}
        </View>

        <HeightSpacer height={15} />

        <TouchableOpacity style={styles.addBtn}>
          <View style={reusable.rowWithSpace('flex-start')}>
            <PlusIcon color={COLORS.black} size={24} />

            <WidthSpacer width={5} />

            <ReusableText
              text={`List another space`}
              family={'medium'}
              size={SIZES.medium}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: 150}}></View>
    </ScrollView>
  );
};

export default ListProperties;

const styles = StyleSheet.create({
  addBtn: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    height: 50,
    backgroundColor: COLORS.lightWhite,
    padding: 10,
    justifyContent: 'center',
  },
});
