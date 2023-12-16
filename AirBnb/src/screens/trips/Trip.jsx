import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {HeightSpacer, ReusableBtn, ReusableText} from '../../components';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const Trip = ({navigation}) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const unsub = auth().onAuthStateChanged(async user => {
      if (user) {
        setUserInfo(user.uid);
        getOrderByUserId(userInfo);
        setLoading(false);
      } else {
        console.log('User not found');
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
          ) : (
            <View>
              <Text>Hello</Text>
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
});
export default Trip;
