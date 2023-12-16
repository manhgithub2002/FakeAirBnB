import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Calender, Chat, HostHome, HostProfile, Insights} from '../screens';
import {
  HomeModernIcon,
  CalendarIcon,
  ChatBubbleOvalLeftIcon,
  Bars3Icon,
  ChartBarIcon,
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
  color: COLORS.red,
};
const HostBottomTabNavigation = () => {
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
        component={HostHome}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <HomeModernIcon
              name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Insights"
        component={Insights}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <ChartBarIcon
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
        name="Calender"
        component={Calender}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <CalendarIcon
              // name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="HostProfile"
        component={HostProfile}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Bars3Icon
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

export default HostBottomTabNavigation;
