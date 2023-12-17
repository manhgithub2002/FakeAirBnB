import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Chat, Home, Trip} from '../screens';
import {
  HomeIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';
import {COLORS} from '../constants/theme';
import TopTab from './TopTab';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 5,
  borderRadius: 20,
  height: 70,
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
};
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{paddingBottom: 48}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <HomeIcon color={focused ? COLORS.red : COLORS.gray} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Trip"
        component={Trip}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <HeartIcon
              // name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <ChatBubbleOvalLeftIcon
              // name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={TopTab}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <UserCircleIcon
              // name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
