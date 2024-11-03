import '../../global.css';

import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';

export const unstable_settings = {
  initialRouteName: '(app)'
};

function RootLayout() {
  const theme = useThemeConfig();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <ThemeProvider value={theme}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              navigationBarColor: theme.colors.background,
              statusBarStyle: theme.dark ? 'light' : 'dark',
              statusBarColor: theme.colors.background,
              headerShown: false
            }}
          >
            <Stack.Screen name="(app)" />
          </Stack>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
