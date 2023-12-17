import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {HeightSpacer, ReusableBtn, ReusableText} from '../../components';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const Trip = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [order, setOrder] = useState();

  const getOrderByUserId = async userId => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/orders/user/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );

      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);

      auth().onAuthStateChanged(async user => {
        if (user) {
          console.log(1);
          setUserInfo(user.uid);
          await getOrderByUserId(user.uid);
          setLoading(false);
        } else {
          console.log('User not found');
        }
      });

      return () => {
        console.log('Tab unfocused');
      };
    });

    return unsubscribe;
  }, [navigation]);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  console.log(order);

  return (
    <View styles={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView>
        <HeightSpacer height={50} />

        <View style={{marginHorizontal: 20}}>
          <View>
            <ReusableText
              text={'Trips'}
              family={'bold'}
              size={TEXT.xxLarge}
              color={COLORS.black}
            />
          </View>

          <HeightSpacer height={20} />
          {userInfo ? (
            order.current.length !== 0 || order.coming.length !== 0 ? (
              <View>
                <ReusableText
                  text={'Current Trips'}
                  family={'bold'}
                  size={TEXT.large}
                  color={COLORS.black}
                />

                <HeightSpacer height={10} />

                {order.current.map((item, index) => (
                  <View key={index} style={{marginBottom: 12}}>
                    <TouchableOpacity
                      style={styles.tile}
                      onPress={() =>
                        navigation.navigate('UserTripDetails', {item: item})
                      }>
                      <ReusableText
                        text={`Property: ${item.propertyId}`}
                        family={'medium'}
                        size={TEXT.medium}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                <HeightSpacer height={10} />

                <ReusableText
                  text={'Next Trips'}
                  family={'bold'}
                  size={TEXT.large}
                  color={COLORS.black}
                />

                <HeightSpacer height={10} />

                {order.coming.map((item, index) => (
                  <View key={index} style={{marginBottom: 12}}>
                    <TouchableOpacity
                      style={styles.tile}
                      onPress={() =>
                        navigation.navigate('UserTripDetails', {item: item})
                      }>
                      <ReusableText
                        text={`Property: ${item.propertyId}`}
                        family={'medium'}
                        size={TEXT.medium}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <ReusableText
                  text={'No trips booked ... yet!'}
                  family={'bold'}
                  size={TEXT.large}
                  color={COLORS.black}
                />
                <HeightSpacer height={10} />

                <ReusableText
                  text={
                    'Time to dust off your bags and start planning your next adventrue'
                  }
                  family={'regular'}
                  size={TEXT.medium}
                  color={COLORS.black}
                />

                <HeightSpacer height={20} />

                <ReusableBtn
                  onPress={() => navigation.navigate('Bottom')}
                  btnText={'Start searching'}
                  width={(SIZES.width - 50) / 2.2}
                  backgroundColor={COLORS.lightGreen}
                  boderColor={COLORS.red}
                  borderWidth={0}
                  textColor={COLORS.white}
                />

                <HeightSpacer height={10} />
              </View>
            )
          ) : (
            <View>
              <ReusableText
                text={`Hello, Let's login and take your trip`}
                family={'regular'}
                size={TEXT.medium}
                color={COLORS.black}
              />

              <HeightSpacer height={20} />

              <ReusableBtn
                onPress={() => navigation.navigate('Login')}
                btnText={'Login'}
                width={(SIZES.width - 50) / 2.2}
                backgroundColor={COLORS.lightGreen}
                boderColor={COLORS.red}
                borderWidth={0}
                textColor={COLORS.white}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  noMesage: {
    alignItems: 'center',
  },
  tile: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.black,
  },
});
export default Trip;
