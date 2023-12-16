import {View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Icons from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reusable from '../../../components/Reusable/reuasble.style';
import {TEXT, COLORS, SIZES} from '../../../constants/theme';
import {
  HeightSpacer,
  ProfileTile,
  PropertyTiles,
  ReusableBtn,
  ReusableText,
} from '../../../components';
import axios from 'axios';

const HostProfile = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [num, setNum] = useState();

  const getNumProperties = async user_id => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5003/api/properties/numProperties/${user_id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setNum(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(user => {
      if (user) {
        setUserInfo(user.uid);
      } else {
        console.log('Fail to get user information!');
      }

      getNumProperties(user.uid);
      setLoading(false);
    });
  }, []);

  const removeValue = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('@user');
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
      console.log('Clear Storage: Done!');
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Bottom');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  return (
    <SafeAreaView styles={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView>
        <HeightSpacer height={50} />

        <View style={{marginHorizontal: 20}}>
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={'Menu'}
              family={'bold'}
              size={TEXT.xxLarge}
              color={COLORS.black}
            />

            <Icons.BellIcon color={COLORS.black} size={26} />
          </View>

          <HeightSpacer height={30} />
          <View>
            <ReusableText
              text={'Hosting'}
              family={'bold'}
              size={TEXT.large}
              color={COLORS.black}
            />

            <HeightSpacer height={15} />

            <PropertyTiles num={num} user_id={userInfo} />

            <HeightSpacer height={30} />

            <ProfileTile
              title={'Switch to traveling'}
              icon={'creditcard'}
              onPress={() => {
                navigation.navigate('Bottom');
              }}
            />
            <ProfileTile
              title={'List your space'}
              icon={'creditcard'}
              onPress={() => navigation.navigate('Payments')}
            />
          </View>

          <HeightSpacer height={30} />

          <ReusableBtn
            onPress={() => {
              logout();
              removeValue();
            }}
            btnText={'Log out'}
            width={'100%'}
            backgroundColor={COLORS.red}
            boderColor={COLORS.red}
            borderWidth={0}
            textColor={COLORS.white}
          />

          <View
            style={{
              borderWidth: 50,
              borderColor: '#F2F2F2',
              marginVertical: 15,
            }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HostProfile;
