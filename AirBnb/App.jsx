/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CalenderDetails,
  Chat,
  ChatDetails,
  CountryDetails,
  CreateFacility,
  CreateProperty,
  Failed,
  HotelDetails,
  HotelList,
  HotelSearch,
  InformationDetails,
  IntroHost,
  ListProperties,
  Onboarding,
  PlaceDetails,
  Recommended,
  Registration,
  Search,
  SelectRoom,
  SelectedRoom,
  Settings,
  Signin,
  Successed,
  Trip,
  UserDetails,
  UserTripDetails,
} from './src/screens';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import HostBottomTabNavigation from './src/navigation/HostBottomTabNavigation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Notification from './src/notifications/notification';
import {DateTimePicker} from './src/components';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('app', () => App);

const Stack = createNativeStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        console.log('Loading.....................');
        setLoading(false);
      }
    });
  }, []);

  if (!user) console.log('User not found');

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Guest mode */}
        <Stack.Navigator>
          <Stack.Screen
            name="OnBoarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bottom"
            component={BottomTabNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CountryDetails"
            component={CountryDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HotelSearch"
            component={HotelSearch}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HotelDetails"
            component={HotelDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectRoom"
            component={SelectRoom}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectedRoom"
            component={SelectedRoom}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HotelList"
            component={HotelList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Recommended"
            component={Recommended}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InformationDetails"
            component={InformationDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatDetails"
            component={ChatDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IntroHost"
            component={IntroHost}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserDatails"
            component={UserDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Successed"
            component={Successed}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Failed"
            component={Failed}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Trip"
            component={Trip}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserTripDetails"
            component={UserTripDetails}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="DateTimePicker"
            component={DateTimePicker}
            options={{headerShown: false}}
          /> */}
          {/* End Guest Mode */}

          {/* Host Mode */}
          <Stack.Screen
            name="HostBottom"
            component={HostBottomTabNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateProperty"
            component={CreateProperty}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateFacility"
            component={CreateFacility}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ListProperties"
            component={ListProperties}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CalenderDetails"
            component={CalenderDetails}
            options={{headerShown: false}}
          />
          {/* End Host Mode */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
