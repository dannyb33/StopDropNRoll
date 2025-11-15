// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useSensors } from '../sensors/useSensors';
import { isFalling } from '../sensors/sensorUtils';
import { globalStyles } from '../../styles/globalStyles';
import { useGame } from '@/context/GameContext';
import { soundManager } from '@/hooks/soundUtils';

export default function DropScreen() {
  const SAMPLES = 5;
  const THRESHOLD = 3;
  const TIME_LIMIT = 3;
  const [seconds, setSeconds] = useState(TIME_LIMIT);
  
  const router = useRouter();

  const { gyro, accel } = useSensors();
  const [checkHistory, setCheckHistory] = useState<boolean[]>([]);

  const hasNavigated = useRef(false);

  const { endDropTimer } = useGame();

  const handleSuccess = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    soundManager.play('ding');

    const dropTime = endDropTimer();
    console.log("Drop took ", dropTime, " ms.")
    
    router.replace('/(game)/roll-phase');
  };

  const handleFailure = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    soundManager.play('buzzer');

    router.replace('/(game)/failure-screen');
  };

  useEffect(() => {
    soundManager.play('drop');
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fail when timer runs out
  useEffect(() => {
    if (seconds < 1) {
      handleFailure();
    }
  }, [seconds]);

  // Update gyro state
  useEffect(() => {
    const result = isFalling(accel);

    setCheckHistory(prev => {
        const next = [...prev, result];
        if (next.length > SAMPLES) next.shift();
        return next;
    });

  }, [gyro, accel]);

    // Check for failure condition only after countdown starts
  useEffect(() => {
    // Only start checking after at least 1 second has passed
    if (checkHistory.length === SAMPLES) {
      const trueCount = checkHistory.filter(x => x).length;
      if (trueCount > THRESHOLD) {
        handleSuccess();
      }
    }
  }, [checkHistory, seconds]);

  return (
    <View style={globalStyles.dropContainer}>
      <Text style={globalStyles.title}>DROP!</Text>

      {/* <Text style={globalStyles.timer}>{seconds}</Text>
      
      <Text style={globalStyles.status}>
        Device Falling: {isFalling(accel) ? '✓' : '✗'}
      </Text>

      <View style={globalStyles.debugInfo}>
        <Text style={globalStyles.debugText}>
          Gyro: x:{gyro.x.toFixed(2)} y:{gyro.y.toFixed(2)} z:{gyro.z.toFixed(2)}
        </Text>
        <Text style={globalStyles.debugText}>
          Accel: x:{accel.x.toFixed(2)} y:{accel.y.toFixed(2)} z:{accel.z.toFixed(2)}
        </Text>
      </View>

      {/* Debug button - remove in production */}
      {/* <TouchableOpacity style={globalStyles.button} onPress={handleSuccess}>
        <Text style={globalStyles.buttonText}>Skip (Debug)</Text>
      </TouchableOpacity> */}
    </View>
  );
}