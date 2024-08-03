import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StatusBar } from 'react-native';
import {
  useFonts,
  // eslint-disable-next-line camelcase
  Poppins_400Regular,
  // eslint-disable-next-line camelcase
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import RootNavigation from './navigation';
import { useAppDispatch } from './app/store';
import { loadUserData } from './features/user/userSlice';
import { lightTheme } from './utils/color';
import initI18 from './localization/i18n';
import { loadSettings } from './features/settings/settingsSlice';

SplashScreen.preventAutoHideAsync();

const App = () => {
  // eslint-disable-next-line camelcase
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  const [localeLoaded, setLocaleLoaded] = useState(false);
  const appState = useRef(AppState.currentState);
  const dispatch = useAppDispatch();

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current === 'background' && nextAppState === 'active') {
      // console.log('Refresh data');
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    dispatch(loadUserData());
  }, []);

  useEffect(() => {
    const initTranslations = async () => {
      const settings = await dispatch(loadSettings());
      await initI18(settings.payload.language);
      setLocaleLoaded(true);
    };
    initTranslations();
  }, []);

  useEffect(() => {
    const eventSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      eventSubscription.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && localeLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, localeLoaded]);

  if (!fontsLoaded || !localeLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={lightTheme.primary} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: lightTheme.primary }}
        onLayout={onLayoutRootView}
      >
        <RootNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
