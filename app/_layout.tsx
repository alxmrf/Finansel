import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/useColorScheme';
import Colors from '@/src/styling/Colors';
import { createDatabase } from '@/src/repository/database';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  createDatabase();
  const [loaded] = useFonts({
    SpaceMono: require('../src/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // 1. ThemeProvider now wraps the app to provide theme colors.
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? { ...DefaultTheme, dark: true, colors: { ...DefaultTheme.colors, ...Colors.dark } }
          : DefaultTheme
      }
    >

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
