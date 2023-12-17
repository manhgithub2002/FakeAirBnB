import {
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  HotelMap,
  NetworkImage,
  OfferTile,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
  // ReviewsList,
} from '../../components/index';
import {convertStringToFormattedDate} from '../../utils/getDate';
import {Rating} from 'react-native-stock-star-rating';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import reusable from '../../components/Reusable/reuasble.style';
import {ListBulletIcon} from 'react-native-heroicons/outline';
import {StarIcon, CheckCircleIcon} from 'react-native-heroicons/solid';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserTripDetails = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const getPropertyById = async property_id => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/properties/${property_id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isConversationAlreadyExists = async host_id => {
    setLoading(true);
    var result = '';
    try {
      const conversationForCurrentUserSnapshot = await firestore()
        .collection('conversations')
        .where('users', 'array-contains', userInfo)
        .get();

      const conversationArray = conversationForCurrentUserSnapshot?.docs;
      if (conversationArray && conversationArray.length > 0) {
        conversationForCurrentUserSnapshot.docs.map(conversation => {
          const isExisted = conversation.data().users.includes(host_id);
          if (isExisted) {
            console.log(conversation.id);
            result = conversation.id;
          }
        });
      }
      return result;
    } catch (error) {
      console.error('Error checking conversation existence:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsub = auth().onAuthStateChanged(async user => {
      if (user) {
        await getPropertyById(item.propertyId);

        setUserInfo(user.uid);

        setLoading(false);
      } else {
        console.log('Fail to get user information!');
      }
    });

    return () => unsub;
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  const hotel = {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris sit amet massa vitae tortor condimentum lacinia quis. Elit ut aliquam purus sit amet luctus. Nunc mi ipsum faucibus vitae aliquet. Et magnis dis parturient montes nascetur ridiculus mus mauris. Vel fringilla est ullamcorper eget nulla facilisi.',
    contact: '64c5d95adc7efae2a45ec376',
  };

  let coordinates = {
    id: property.id,
    title: property.title,
    latitude: property.latitude ? parseFloat(property.latitude) : 20.9733581,
    longitude: property.longitude
      ? parseFloat(property.longitude)
      : 105.3230125,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };
  console.log(property.latitude);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{zIndex: 2}}>
        <AppBar
          title={property.title}
          color={COLORS.white}
          color1={COLORS.white}
          icon={'search1'}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={0}
          left={20}
          right={20}
          sticky={COLORS.background}
        />
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <NetworkImage
            source={property.imageUrl}
            width={'100%'}
            height={220}
            radius={25}
          />

          <View style={styles.titleContainer}>
            <View style={styles.titleColumn}>
              <ReusableText
                text={property.title}
                family={'medium'}
                size={TEXT.large}
                color={COLORS.black}
              />

              <HeightSpacer height={10} />

              <ReusableText
                text={property.location}
                family={'medium'}
                size={TEXT.medium}
                color={COLORS.black}
              />

              <HeightSpacer height={15} />

              <View style={reusable.rowWithSpace('space-between')}>
                <Rating
                  maxStars={5}
                  stars={property.rating}
                  bordered={false}
                  color={'#FD9942'}
                />

                <ReusableText
                  text={`(${property.review})`}
                  family={'medium'}
                  size={TEXT.medium}
                  color={COLORS.gray}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.container, {paddingTop: 40}]}>
          {/* Your Plan */}
          <ReusableText
            text={'Your Plan'}
            family={'medium'}
            size={TEXT.large}
            color={COLORS.black}
          />
          <HeightSpacer height={10} />

          <View style={reusable.rowWithSpace('flex-start')}>
            <ReusableText
              text={'Start date :'}
              family={'bold'}
              size={TEXT.medium}
              color={COLORS.black}
            />

            <WidthSpacer width={5} />

            <ReusableText
              text={convertStringToFormattedDate(item.startDate)}
              family={'regular'}
              size={TEXT.medium}
              color={COLORS.black}
            />
          </View>

          <HeightSpacer height={10} />

          <View style={reusable.rowWithSpace('flex-start')}>
            <ReusableText
              text={'End date :'}
              family={'bold'}
              size={TEXT.medium}
              color={COLORS.black}
            />

            <WidthSpacer width={5} />

            <ReusableText
              text={convertStringToFormattedDate(item.endDate)}
              family={'regular'}
              size={TEXT.medium}
              color={COLORS.black}
            />
          </View>

          <HeightSpacer height={10} />

          <View style={reusable.rowWithSpace('flex-start')}>
            <ReusableText
              text={'People :'}
              family={'bold'}
              size={TEXT.medium}
              color={COLORS.black}
            />

            <WidthSpacer width={5} />

            <ReusableText
              text={`${item.guestNumber}`}
              family={'regular'}
              size={TEXT.medium}
              color={COLORS.black}
            />
          </View>
          <HeightSpacer height={10} />

          {/* Description */}
          <ReusableText
            text={'Description'}
            family={'medium'}
            size={TEXT.large}
            color={COLORS.black}
          />
          <HeightSpacer height={10} />

          <DescriptionText text={hotel.description} />

          {/* What this place offers */}
          <ReusableText
            text={'What this place offers'}
            family={'medium'}
            size={TEXT.large}
            color={COLORS.black}
          />

          <HeightSpacer height={10} />
          {property.facility.map((item, index) => (
            <View key={index} style={{marginBottom: 10}}>
              <OfferTile item={item} />
            </View>
          ))}
          <HeightSpacer height={10} />

          {/* Location */}
          <HeightSpacer height={10} />
          <ReusableText
            text={'Location'}
            family={'medium'}
            size={TEXT.large}
            color={COLORS.black}
          />
          <HeightSpacer height={10} />
          <ReusableText
            text={property.location}
            family={'regular'}
            size={TEXT.small}
            color={COLORS.gray}
          />
          <HotelMap coordinates={coordinates} />

          {/* Host by */}
          <HeightSpacer height={10} />
          <ReusableText
            text={`Host by ${property.host_info.fullname} `}
            family={'medium'}
            size={TEXT.large}
            color={COLORS.black}
          />

          <HeightSpacer height={5} />

          <ReusableText
            text={`Joined in May 2021`}
            family={'regular'}
            size={TEXT.small}
            color={COLORS.black}
          />

          <HeightSpacer height={15} />

          <View style={reusable.rowWithSpace('flex-start')}>
            <StarIcon color={COLORS.black} size={20} />
            <WidthSpacer width={10} />
            <ReusableText
              text={`281 Reviews`}
              family={'regular'}
              size={TEXT.medium}
              color={COLORS.black}
            />
          </View>

          <HeightSpacer height={10} />

          <View style={reusable.rowWithSpace('flex-start')}>
            <CheckCircleIcon color={COLORS.black} size={20} />
            <WidthSpacer width={10} />
            <ReusableText
              text={`Identity verified`}
              family={'regular'}
              size={TEXT.medium}
              color={COLORS.black}
            />
          </View>

          <HeightSpacer height={15} />

          <ReusableText
            text={`During your stay`}
            family={'medium'}
            size={TEXT.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={10} />

          <ReusableText
            text={`Your host ${property.host_info.fullname} be available for any advice or help during your stay`}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={15} />
          {property.host_id !== userInfo ? (
            <ReusableBtn
              onPress={async () => {
                const conID = await isConversationAlreadyExists(
                  property.host_id,
                );
                navigation.navigate('ChatDetails', {
                  id: conID,
                  users: [userInfo, property.host_id],
                });
              }}
              btnText={'Contact Host'}
              width={SIZES.width - 40}
              backgroundColor={COLORS.background}
              boderColor={COLORS.green}
              borderWidth={2}
              textColor={COLORS.black}
            />
          ) : (
            <></>
          )}

          {/* Review */}
          <HeightSpacer height={10} />
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={'Reviews'}
              family={'medium'}
              size={TEXT.large}
              color={COLORS.black}
            />

            <TouchableOpacity>
              <ListBulletIcon color={COLORS.black} size={20} />
            </TouchableOpacity>
          </View>
          {/* <ReviewsList reviews={hotel.reviews} /> */}
          <HeightSpacer height={40} />
        </View>
      </ScrollView>
      <View style={[reusable.rowWithSpace('space-between'), styles.bottom]}>
        <View>
          <ReusableText
            text={`\$ ${property.price}`}
            family={'medium'}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={5} />

          <ReusableText
            text={
              convertStringToFormattedDate(item.startDate) +
              ' ' +
              convertStringToFormattedDate(item.endDate)
            }
            family={'medium'}
            size={SIZES.medium}
            color={COLORS.gray}
          />
        </View>

        <ReusableBtn
          onPress={() => {}}
          btnText={'Cancel the Room'}
          width={(SIZES.width - 50) / 2.2}
          backgroundColor={COLORS.red}
          boderColor={COLORS.red}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginHorizontal: 20,
    marginTop: 50,
  },
  titleContainer: {
    margin: 15,
    backgroundColor: COLORS.lightWhite,
    height: 120,
    position: 'absolute',
    top: 170,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  titleColumn: {
    padding: 10,
  },
  bottom: {
    paddingHorizontal: 30,
    backgroundColor: COLORS.lightWhite,
    height: 90,
    paddingVertical: 20,
  },
});

export default UserTripDetails;
