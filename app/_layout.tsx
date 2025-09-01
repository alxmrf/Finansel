import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import { FinanselDarkTheme } from '@/styling/Themes';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // 1. ThemeProvider now wraps the app to provide theme colors.
    <ThemeProvider value={colorScheme === 'dark' ? FinanselDarkTheme : DefaultTheme}>
      
      {/* 2. The Stack navigator is the root component. */}
      <Stack>
        {/* 3. Let the (tabs) layout manage its own header. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* This screen is for handling unmatched routes. */}
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* 4. The StatusBar style is now tied to the color scheme. */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

    </ThemeProvider>
  );
}
