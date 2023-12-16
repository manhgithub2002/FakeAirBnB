import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {COLORS, SIZES} from '../../constants/theme';
import reusable from '../../components/Reusable/reuasble.style';
import {CreditCardIcon} from 'react-native-heroicons/outline';
import {
  AppBar,
  AssetImage,
  Counter,
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import DatePicker from '../../components/Modal/DatePicker';

const SelectedRoom = ({navigation}) => {
  const router = useRoute();
  const {property_id, property} = router.params;

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Des',
  ];

  const handleDateSelection = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Use Effect
  useEffect(() => {
    setLoading(true);
    const unsub = auth().onAuthStateChanged(async user => {
      if (user) {
        setUserInfo(user.uid);
        setLoading(false);
      } else {
        console.log('Fail to get user information!');
      }
    });
    unsub();
  }, []);

  //Submit handling
  const handleSummit = async () => {
    const data = {
      guestId: userInfo,
      propertyId: property_id,
      guestNumber: count,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      setLoading(true);
      await axios.post(`http://10.0.2.2:5003/api/orders`, data, {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      });
      navigation.navigate('Successed', {property: property, host: 'guest'});
    } catch (error) {
      console.log(error);
      navigation.navigate('Failed', {property: property, host: 'guest'});
    } finally {
      setLoading(false);
    }
    console.log(data);
  };

  //Loading screen
  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  return (
    <ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              onSelectDate={handleDateSelection}
              property_id={property_id}
            />
            <HeightSpacer height={15} />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                console.log('Ngày đi', startDate);
                console.log('Ngày về', endDate);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{height: 100}}>
        <AppBar
          title={'Request to book'}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
          top={50}
          left={20}
          right={20}
        />
      </View>

      <View style={{marginHorizontal: 20}}>
        <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 16}}>
          <NetworkImage
            source={property.imageUrl}
            width={'100%'}
            height={200}
            radius={16}
          />

          <HeightSpacer height={20} />

          <View>
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={property.title}
                family={'medium'}
                size={SIZES.large}
                color={COLORS.black}
              />

              <View style={reusable.rowWithSpace('flex-start')}>
                <Rating rating={property.rating} />

                <WidthSpacer width={10} />

                <ReusableText
                  text={`(${property.review})`}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
            </View>

            <HeightSpacer height={10} />

            <ReusableText
              text={property.location}
              family={'medium'}
              size={SIZES.medium}
              color={COLORS.black}
            />

            {/* Your trip */}
            <View
              style={{
                borderWidth: 3,
                borderColor: '#F2F2F2',
                marginVertical: 15,
              }}></View>

            <ReusableText
              text={'Your trip'}
              family={'bold'}
              size={SIZES.large}
              color={COLORS.black}
            />

            <HeightSpacer height={20} />

            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={'Dates'}
                family={'bold'}
                size={SIZES.medium}
                color={COLORS.black}
              />
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <ReusableText
                  text={'Edit'}
                  family={'bold'}
                  size={SIZES.medium}
                  color={COLORS.black}
                  decor={'underline'}
                />
              </TouchableOpacity>
            </View>

            <ReusableText
              text={`${startDate.getDate()}, ${
                month[startDate.getMonth()]
              } - ${endDate.getDate()}, ${month[endDate.getMonth()]}`}
              family={'regular'}
              size={SIZES.medium}
              color={COLORS.black}
            />

            <HeightSpacer height={15} />
            <ReusableText
              text={'Guest'}
              family={'bold'}
              size={SIZES.medium}
              color={COLORS.black}
            />
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={`${count} Guest`}
                family={'regular'}
                size={SIZES.medium}
                color={COLORS.black}
              />

              <Counter initialValue={count} onValueChange={setCount} />
            </View>

            <HeightSpacer height={10} />

            {/* Your total */}
            <View
              style={{
                borderWidth: 3,
                borderColor: '#F2F2F2',
                marginVertical: 15,
              }}></View>
            <ReusableText
              text={'Your total'}
              family={'bold'}
              size={SIZES.large}
              color={COLORS.black}
            />

            <HeightSpacer height={20} />
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={`${endDate.getDate() - startDate.getDate()} night`}
                family={'regular'}
                size={SIZES.medium}
                color={COLORS.black}
              />

              <ReusableText
                text={`$ ${
                  (endDate.getDate() - startDate.getDate()) * property.price
                }`}
                family={'regular'}
                size={SIZES.medium}
                color={COLORS.black}
              />
            </View>

            <HeightSpacer height={5} />

            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#F2F2F2',
                marginVertical: 15,
              }}></View>

            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={'Total(USD)'}
                family={'bold'}
                size={SIZES.medium}
                color={COLORS.black}
              />

              <ReusableText
                text={`$ ${
                  (endDate.getDate() - startDate.getDate()) * property.price
                }`}
                family={'bold'}
                size={SIZES.medium}
                color={COLORS.black}
              />
            </View>

            <HeightSpacer height={10} />
            {/* Pay with */}
            <View
              style={{
                borderWidth: 3,
                borderColor: '#F2F2F2',
                marginVertical: 15,
              }}></View>

            <ReusableText
              text={'Pay with'}
              family={'bold'}
              size={SIZES.large}
              color={COLORS.black}
            />

            <HeightSpacer height={20} />

            <View style={reusable.rowWithSpace('space-between')}>
              <View style={reusable.rowWithSpace('flex-start')}>
                <CreditCardIcon size={26} color={COLORS.gray} />

                <WidthSpacer width={5} />

                <ReusableText
                  text={'Credit or debit card'}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
              </View>

              <View style={reusable.rowWithSpace('flex-start')}>
                <AssetImage
                  data={require('../../assets/images/Visa.png')}
                  mode={'contain'}
                  width={30}
                  height={20}
                />

                <ReusableText
                  text={'Visa'}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
              </View>
            </View>

            <HeightSpacer height={10} />

            {/* Required for your trip */}
            <View
              style={{
                borderWidth: 3,
                borderColor: '#F2F2F2',
                marginVertical: 15,
              }}></View>

            <ReusableText
              text={'Required for your trip'}
              family={'bold'}
              size={SIZES.large}
              color={COLORS.black}
            />

            <HeightSpacer height={20} />

            <View style={reusable.rowWithSpace('space-between')}>
              <View style={reusable.rowWithSpace('flex-start')}>
                <ReusableText
                  text={'Phone Number'}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.black}
                />

                <AssetImage
                  data={require('../../assets/images/Visa.png')}
                  mode={'contain'}
                  width={30}
                  height={20}
                />
              </View>

              <View style={reusable.rowWithSpace('flex-start')}>
                <ReusableBtn
                  onPress={() => navigation.navigate('Successed', {item})}
                  btnText={'Add'}
                  width={SIZES.xxLarge}
                  backgroundColor={COLORS.green}
                  boderColor={COLORS.green}
                  borderWidth={0}
                  textColor={COLORS.white}
                />

                <WidthSpacer width={10} />
              </View>
            </View>
            <HeightSpacer height={10} />

            <View
              style={{
                borderWidth: 3,
                borderColor: '#F2F2F2',
                marginVertical: 15,
              }}></View>

            <ReusableBtn
              onPress={() => {
                handleSummit();
              }}
              btnText={'Request to book'}
              width={SIZES.width - 50}
              backgroundColor={COLORS.green}
              boderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />

            <HeightSpacer height={30} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SelectedRoom;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: SIZES.width - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.green,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
