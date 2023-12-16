import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {COLORS, TEXT} from '../../../constants/theme';
import {HeightSpacer, ReusableBtn, ReusableText} from '../../../components';
import Test from './Test';

const HostHome = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [order, setOrder] = useState();

  // const getOrderByUserId = async userId => {
  //   try {
  //     const response = await axios.get(
  //       `http://10.0.2.2:5003/api/orders/user/${userId}`,
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           'content-type': 'application/json',
  //         },
  //       },
  //     );

  //     setOrder(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   setLoading(true);
  //   const unsub = auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       setUserInfo(user.uid);
  //       getOrderByUserId(userInfo);
  //       setLoading(false);
  //     } else {
  //       console.log('User not found');
  //     }
  //   });

  //   return () => unsub;
  // }, []);
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
              text={'Welcome back, '}
              family={'bold'}
              size={TEXT.xxLarge}
              color={COLORS.black}
            />

            <HeightSpacer height={20} />

            <ReusableBtn
              onPress={() => navigation.navigate('CreateProperty')}
              btnText={'Create a new listing'}
              width={200}
              boderColor={COLORS.red}
              borderWidth={1}
              textColor={COLORS.black}
            />
          </View>

          <HeightSpacer height={30} />

          <View>
            <ReusableText
              text={'Your reservations'}
              family={'bold'}
              size={TEXT.large}
              color={COLORS.black}
            />

            <HeightSpacer height={15} />

            <Test></Test>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HostHome;
