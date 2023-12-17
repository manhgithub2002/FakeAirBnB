import {View, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Icons from 'react-native-heroicons/outline';
import {COLORS, TEXT} from '../constants/theme';
import {
  HeightSpacer,
  HostTiles,
  ProfileAuthTiles,
  ProfileTile,
  ReusableBtn,
  ReusableText,
} from '../components';
import reusable from '../components/Reusable/reuasble.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PersonalTiles} from '../components/index';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TopTab = ({navigation}) => {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem('@user');
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(getUserInDb(userData.uid));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserInDb = async uid => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://10.0.2.2:5003/api/users/${uid}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLocalUser();
    const unsub = auth().onAuthStateChanged(async user => {
      if (user) {
        setUserInfo(getUserInDb(user.uid));
        await AsyncStorage.setItem('@user', JSON.stringify(user));
      } else {
        console.log('User is not authenticated');
      }
    });

    return () => unsub;
  }, []);

  const logout = async () => {
    try {
      await auth().signOut();
      setUserInfo(null);
    } catch (error) {
      console.log(error);
    }
  };

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

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  console.log(userInfo);
  return (
    <SafeAreaView styles={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView>
        <HeightSpacer height={50} />

        <View style={{marginHorizontal: 20}}>
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={'Profile'}
              family={'bold'}
              size={TEXT.xxLarge}
              color={COLORS.black}
            />

            <Icons.BellIcon color={COLORS.black} size={26} />
          </View>

          {userInfo ? (
            <View>
              <HeightSpacer height={30} />

              <PersonalTiles
                name={userInfo.fullname}
                onPress={() => navigation.navigate('UserDatails')}
              />
            </View>
          ) : (
            <View>
              <HeightSpacer height={15} />

              <ProfileAuthTiles
                onPress={() => navigation.navigate('Signin')}
                onPress1={() => navigation.navigate('Registration')}
              />
            </View>
          )}

          <HeightSpacer height={30} />

          <ReusableText
            text={'Being a Host'}
            family={'bold'}
            size={TEXT.large}
            color={COLORS.black}
          />

          <HeightSpacer height={15} />

          <HostTiles
            onPress={
              userInfo
                ? () => navigation.navigate('IntroHost')
                : () => navigation.navigate('Signin')
            }
          />

          <HeightSpacer height={30} />
          {userInfo ? (
            <View>
              <ReusableText
                text={'Info'}
                family={'bold'}
                size={TEXT.large}
                color={COLORS.black}
              />

              <HeightSpacer height={15} />

              <ProfileTile
                title={'Personal Information'}
                icon={'creditcard'}
                onPress={() => navigation.navigate('InformationDetails')}
              />
              <ProfileTile
                title={'Payments and payouts'}
                icon={'creditcard'}
                onPress={() => navigation.navigate('Payments')}
              />
              <ProfileTile
                title={'Settings'}
                icon={'creditcard'}
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
          ) : null}

          <HeightSpacer height={30} />
          {userInfo ? (
            <View>
              <ReusableText
                text={'Hosting'}
                family={'bold'}
                size={TEXT.large}
                color={COLORS.black}
              />

              <HeightSpacer height={15} />

              <ProfileTile
                title={'Switch to hosting'}
                icon={'creditcard'}
                onPress={() => {
                  navigation.navigate('HostBottom');
                }}
              />
              <ProfileTile
                title={'List your space'}
                icon={'creditcard'}
                onPress={() => navigation.navigate('Payments')}
              />
            </View>
          ) : null}

          <HeightSpacer height={30} />

          {!userInfo ? (
            <View></View>
          ) : (
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
          )}

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

export default TopTab;
