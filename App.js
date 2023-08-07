import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import RNCallKeep from 'react-native-callkeep';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './src/navigations/authNavigator';
import {callKeepOptions} from '.';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    }
  };

  const getToken = async () => {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    console.log('checkToken=======', checkToken);
    if (!checkToken) {
      try {
        const fcmToken = await messaging().getToken();
        console.log('fcm Token generated::::', fcmToken);
        if (fcmToken) {
          console.log('fcm Token Generated:::', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('error in fcmToken', error);
        Alert.alert(error?.message);
      }
    }
  };

  RNCallKeep.setup(callKeepOptions).then(res => {
    AsyncStorage.getItem('call_data').then(data => {
      if (data !== null) {
        let payload = JSON.parse(data);
        let uuid = payload.userId;
        RNCallKeep.displayIncomingCall(
          uuid,
          payload.name,
          payload.name +
            ` (${payload.callType === 'VIDEO_CALL' ? 'Video' : 'Audio'} Call)`,
          'generic',
          true,
          {},
        );
      }
    });
    RNCallKeep.setAvailable(true);
  });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('remoteMessage~~~~', remoteMessage);
    let data;
    if (remoteMessage.data) {
      data = remoteMessage.data;
    }
    let payload = JSON.parse(data.customData);
    console.log('Message handled', payload);
    let uuid = payload.userId;

    if (payload.notificationType === 'START_CALL') {
      await AsyncStorage.setItem('call_data', JSON.stringify(payload));

      RNCallKeep.backToForeground();
      RNCallKeep.displayIncomingCall(
        uuid,
        payload.name,
        payload.name +
          ` (${payload.callType === 'VIDEO_CALL' ? 'Video' : 'Audio'} Call)`,
        'generic',
        true,
        {},
      );
    } else if (payload.notificationType === 'END_CALL') {
      RNCallKeep.endAllCalls();
      await AsyncStorage.removeItem('call_data');
    }

    // RNCallKeep.addEventListener('answerCall', ({callUUID}) => {
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
