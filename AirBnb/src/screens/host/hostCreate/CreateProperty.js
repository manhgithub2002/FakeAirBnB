import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HeightSpacer, ReusableBtn, ReusableText} from '../../../components';
import {COLORS, SIZES, TEXT} from '../../../constants/theme';
import CategoryTile from './CategoryTile';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const CreateProperty = ({navigation}) => {
  const [userInfo, setUserInfo] = useState();
  const [active, setActive] = useState();
  const homeType = ['House', 'Flat/apartment', 'Barn', 'Cabin', 'Cave', 'Farm'];
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [town, setTown] = useState();
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState();

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem('@user');
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData.uid);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCountryById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://10.0.2.2:5003/api/countries`, {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      });

      const countryAndId = response.data.map(({country, id}) => ({
        country,
        id,
      }));
      const modify = countryAndId.map(({country, id}) => ({
        label: country,
        value: id,
      }));
      setCountry(modify);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLocalUser();
    getCountryById();
  }, []);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const handleSelect = index => {
    setActive(index);

    setData(prevData => ({
      ...prevData,
      homeType: homeType[index],
    }));
  };

  const handleData = () => {
    return {
      ...data,
      host_id: userInfo,
      country_id: value,
      title: title,
      location: city + ' ' + town,
    };
  };

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  console.log(data);
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View>
        <HeightSpacer height={50} />

        <View style={{marginHorizontal: 20}}>
          <ReusableText
            text={'Which of these best discribes your place?'}
            family={'bold'}
            size={TEXT.large}
            color={COLORS.black}
          />

          <HeightSpacer height={30} />

          <FlatList
            data={homeType}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
            renderItem={({item, index}) => (
              <CategoryTile
                item={item}
                margin={10}
                onPress={() => handleSelect(index)}
                selected={index == active ? true : false}
              />
            )}
          />

          <HeightSpacer height={30} />

          <ReusableText
            text={'Confirm your address'}
            family={'bold'}
            size={TEXT.large}
            color={COLORS.black}
          />

          <HeightSpacer height={15} />

          <ReusableText
            text={'Country'}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={5} />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={country}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select country"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderItem={renderItem}
          />

          <HeightSpacer height={15} />

          <ReusableText
            text={'Address'}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={5} />

          <TextInput
            placeholder="Enter address"
            autoCorrect={false}
            style={styles.inputText(50)}
            onChangeText={setAddress}
            value={address}
          />

          <HeightSpacer height={15} />

          <ReusableText
            text={'City / town / vilage'}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={5} />

          <HeightSpacer height={5} />

          <TextInput
            placeholder="Enter city"
            autoCorrect={false}
            style={styles.inputText(50)}
            onChangeText={setCity}
            value={city}
          />

          <HeightSpacer height={15} />

          <ReusableText
            text={'Town / country / area'}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={5} />

          <TextInput
            placeholder="Enter town"
            autoCorrect={false}
            style={styles.inputText(50)}
            onChangeText={setTown}
            value={town}
          />

          <HeightSpacer height={30} />

          <ReusableText
            text={`Let's give your house title`}
            family={'bold'}
            size={TEXT.large}
            color={COLORS.black}
          />

          <HeightSpacer height={10} />

          <ReusableText
            text={`Short title work best. Have fun with it - you can always change it later`}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={15} />

          <TextInput
            placeholder="Description..."
            multiline={true}
            numberOfLines={2}
            autoCorrect={false}
            style={styles.inputText(100)}
            onChangeText={setTitle}
            value={title}
          />

          <HeightSpacer height={30} />

          <ReusableBtn
            onPress={() => {
              navigation.navigate('CreateFacility', {
                dataProperty: handleData(),
              });
            }}
            btnText={'Next'}
            width={SIZES.width - 40}
            backgroundColor={COLORS.green}
            boderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />

          <View style={{height: 50}}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateProperty;

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: COLORS.lightGrey,
    borderWidth: 2,
    color: COLORS.black,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    fontFamily: 'regular',
    fontSize: TEXT.small,
    color: COLORS.black,
    flex: 1,
  },
  placeholderStyle: {
    fontFamily: 'regular',
    fontSize: TEXT.small,
  },
  selectedTextStyle: {
    fontFamily: 'regular',
    fontSize: TEXT.small,
    color: COLORS.black,
  },
  inputSearchStyle: {
    borderRadius: 12,
    height: 40,
    fontFamily: 'regular',
    fontSize: TEXT.small,
  },
  inputText: height => ({
    fontFamily: 'regular',
    fontSize: TEXT.small,
    color: COLORS.black,
    borderColor: COLORS.lightGrey,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 2,
    height: height,
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  }),
});
