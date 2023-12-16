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
import {
  Counter,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
} from '../../../components';
import {COLORS, SIZES, TEXT} from '../../../constants/theme';
import CategoryTile from './CategoryTile';
import axios from 'axios';
import reusable from '../../../components/Reusable/reuasble.style';
import {useRoute} from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const CreateFacility = ({navigation}) => {
  const route = useRoute();
  const dataProperty = route.params;
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const facility = [
    'Wifi',
    'TV',
    'Kitchen',
    'Air Conditioning',
    'Heating',
    'Fridge',
  ];
  const [countGuest, setCountGuest] = useState(0);
  const [countBath, setCountBath] = useState(0);
  const [countBed, setCountBed] = useState(0);
  const [price, setPrice] = useState(0);

  const handleItemPress = item => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      // Nếu mục đã được chọn, loại bỏ nó khỏi mảng selectedItems
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item),
      );
    } else {
      // Nếu mục chưa được chọn, thêm nó vào mảng selectedItems
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleData = () => {
    const totalData = {
      totalOccupancy: countGuest,
      totalBedrooms: countBed,
      totalBathrooms: countBath,
      price: price,
      facility: selectedItems,
    };

    const {homeType, country_id, title, location, host_id} =
      dataProperty.dataProperty;
    return {...totalData, homeType, country_id, title, location, host_id};
  };

  const addProperty = async data => {
    setLoading(true);
    try {
      await axios.post(`http://10.0.2.2:5003/api/properties/addByHost`, data, {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      });

      navigation.navigate('Successed', {host: 'host'});
    } catch (error) {
      console.log(error);
      navigation.navigate('Failed', {host: 'host'});
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <View>
      <HeightSpacer height={50} />

      <View style={{marginHorizontal: 20}}>
        <ReusableText
          text={`Let's start with the basics`}
          family={'bold'}
          size={TEXT.large}
          color={COLORS.black}
        />

        <HeightSpacer height={30} />

        <ReusableText
          text={`How many people can stay here?`}
          family={'bold'}
          size={TEXT.medium}
          color={COLORS.black}
        />

        <HeightSpacer height={15} />

        <View style={styles.countBox}>
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={`Guest`}
              family={'regular'}
              size={SIZES.medium}
              color={COLORS.black}
            />

            <Counter initialValue={countGuest} onValueChange={setCountGuest} />
          </View>
        </View>

        <HeightSpacer height={15} />

        <View style={styles.countBox}>
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={`Bedrooms`}
              family={'regular'}
              size={SIZES.medium}
              color={COLORS.black}
            />

            <Counter initialValue={countBed} onValueChange={setCountBed} />
          </View>
        </View>

        <HeightSpacer height={15} />

        <View style={styles.countBox}>
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={`Bathrooms`}
              family={'regular'}
              size={SIZES.medium}
              color={COLORS.black}
            />

            <Counter initialValue={countBath} onValueChange={setCountBath} />
          </View>
        </View>

        <HeightSpacer height={30} />

        <ReusableText
          text={`Tell guests what your place has offer`}
          family={'bold'}
          size={TEXT.medium}
          color={COLORS.black}
        />

        <HeightSpacer height={15} />

        <FlatList
          data={facility}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          extraData={selectedItems}
          ItemSeparatorComponent={() => <View style={{height: 16}} />}
          renderItem={({item, index}) => (
            <CategoryTile
              item={item}
              margin={10}
              onPress={() => handleItemPress(item)}
              selected={selectedItems.includes(item) ? true : false}
            />
          )}
        />

        <HeightSpacer height={30} />

        <ReusableText
          text={`Now, set your's price`}
          family={'bold'}
          size={TEXT.medium}
          color={COLORS.black}
        />

        <HeightSpacer height={15} />

        <ReusableText
          text={`$ ${price}`}
          family={'bold'}
          size={TEXT.medium}
          color={COLORS.black}
          align={'center'}
        />

        <Slider
          style={{width: '100%', height: 40}}
          step={1}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={COLORS.black}
          maximumTrackTintColor="#000000"
          value={price}
          onValueChange={setPrice}
        />

        <HeightSpacer height={30} />

        <ReusableBtn
          onPress={async () => {
            // const data = await handleData()
            addProperty(handleData());
            console.log('total', handleData());
          }}
          btnText={'Create Property'}
          width={SIZES.width - 40}
          backgroundColor={COLORS.green}
          boderColor={COLORS.green}
          borderWidth={0}
          textColor={COLORS.white}
        />

        <View style={{height: 50}}></View>
      </View>
    </View>
  );
};

export default CreateFacility;

const styles = StyleSheet.create({
  countBox: {
    height: 50,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
