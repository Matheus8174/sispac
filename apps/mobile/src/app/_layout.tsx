import '../../global.css';

import React from 'react';
import { Stack } from 'expo-router';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { ThemeProvider } from '@react-navigation/native';

function RootLayout() {
  const theme = useThemeConfig();

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          navigationBarColor: theme.colors.background,
          statusBarStyle: theme.dark ? 'light' : 'dark',
          statusBarColor: theme.colors.background,
          headerShown: false
        }}
      />
    </ThemeProvider>
  );
}

export default RootLayout;
