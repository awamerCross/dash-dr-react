import React, { useState, useEffect } from 'react';
import { StyleSheet, View, I18nManager, Text, Platform, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import I18n from "i18n-js";
import * as Notifications from 'expo-notifications';
import MainRoot from './routes/Index';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './store/index';
import './ReactotronConfig';
import { Root } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import NetInfo from "@react-native-community/netinfo";
import { ToasterNative } from './common/ToasterNative';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function App() {
  const [isLoading, setisLoading] = useState(true);




  useEffect(() => {
    I18n.defaultLocale = 'ar';


    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        ToasterNative('NetWork Error', 'danger', 'bottom')
      }
    });


    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('DrTawsel', {
        name: 'E-mail notifications',
        importance: Notifications.AndroidImportance.HIGH,
        sound: true, // <- for Android 8.0+, see channelId property below
      });
    }

    async function loadFont() {
      await Font.loadAsync({
        flatLight: require('./assets/fonts/JF-Flat-light.ttf'),
        flatMedium: require('./assets/fonts/JF-Flat-medium.ttf'),
        flatRegular: require('./assets/fonts/JF-Flat-regular.ttf'),
        ...Ionicons.font,
      });


      setisLoading(false)
    }
    loadFont();





  }, []);

  if (isLoading) {
    return <AppLoading />;
  } else {

    return (

      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Root>
            <MainRoot />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

