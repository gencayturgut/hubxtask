import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './redux/state/store';
import { completeOnboarding } from './redux/onBoardingReducer'; 

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isOnboardingComplete = useSelector((state: RootState) => state.onboarding.completed);
  const dispatch = useDispatch();

  useEffect(() => {
    checkOnboardingStatus();

  }, [isOnboardingComplete]);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@onboarding_complete');
      if (value === 'true') {
        dispatch(completeOnboarding());  // Dispatch Redux action if onboarding is complete
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  if (isOnboardingComplete === undefined) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {isOnboardingComplete && (
          
            <Stack.Screen name="paywall" options={{ headerShown: false }} />
          )}
          {(isOnboardingComplete===true) && (
          <Stack.Screen name="homepage" options={{ headerShown: false }} />  
        )}
          {isOnboardingComplete && (
          <Stack.Screen name="index" options={{ headerShown: false }} />
        )}
        
      </Stack>
    </ThemeProvider>
  );
}
