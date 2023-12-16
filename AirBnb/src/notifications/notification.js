import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
async function getToken() {
  // await PermissionsAndroid.request(
  //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  // );
  const deviceToken = await messaging().getToken();
  console.log('Device token:', deviceToken);
}
const Notification = () => {
  useEffect(() => {
    const notificationHandler = async () => {
      await requestUserPermission();
      await getToken();

      messaging().onNotificationOpenedApp(remoteMessage => {
        Alert.alert('Open notification');
        console.log('REMORE MESSAGE: ', remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('FOREGROUND: ', remoteMessage);
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      });

      return unsubscribe;
    };
    notificationHandler();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>notification</Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
