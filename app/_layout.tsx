import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GameProvider } from '@/context/GameContext';
import { useEffect } from 'react';
import { soundManager } from '@/hooks/soundUtils';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    soundManager.load('buzzer', require('../assets/sounds/buzzer.mp3'));
    soundManager.load('ding', require('../assets/sounds/ding.mp3'));
    soundManager.load('stop', require('../assets/sounds/stop.mp3'));
    soundManager.load('drop', require('../assets/sounds/drop.mp3'));
    soundManager.load('roll', require('../assets/sounds/roll.mp3'));
    soundManager.load('win', require('../assets/sounds/win.mp3'));
  }, []);

  return (
    <GameProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(game)/stop-phase" /> 
            <Stack.Screen name="(game)/drop-phase" /> 
            <Stack.Screen name="(game)/roll-phase" />
            <Stack.Screen name="(game)/failure-screen" /> 
            <Stack.Screen name="(game)/success-screen" /> 
          </Stack>
      </ThemeProvider>
    </GameProvider>

  );
}