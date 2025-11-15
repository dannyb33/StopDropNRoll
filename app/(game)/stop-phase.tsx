// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { isStopped } from '../sensors/sensorUtils';
import { SensorData, useSensors } from '../sensors/useSensors';
import { globalStyles } from '../../styles/globalStyles';
import { useGame } from '@/context/GameContext';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { soundManager } from '@/hooks/soundUtils';

export default function StopScreen() {
  const BUFFER_TIME = 500;

  const MAX = 5;
  const MIN = 2;
  const START_TIME = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  const SAMPLES = 5;
  const THRESHOLD = 3;

  const [seconds, setSeconds] = useState(START_TIME);
  const [isBuffering, setIsBuffering] = useState(true);

  const { gyro, accel } = useSensors();
  const [checkHistory, setCheckHistory] = useState<boolean[]>([]);
  
  const router = useRouter();

  const { startDropTimer } = useGame();

  const buzzerSource = require('../../assets/sounds/buzzer.mp3');
  const player = useAudioPlayer(buzzerSource);

  const handleSuccess = () => {
    startDropTimer();
    soundManager.play('ding');
    router.replace('/(game)/drop-phase');
  };

  const handleFailure = async () => {

    soundManager.play('buzzer');
    router.replace('/(game)/failure-screen');

  };

  useEffect(() => {
    soundManager.play('stop');
  }, []);

  // Buffer period - ignore sensor data for first 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Buffer period ended, starting stop detection');
      setIsBuffering(false);
    }, BUFFER_TIME);

    return () => clearTimeout(timer);
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

  // Succeed when timer runs out
  useEffect(() => {
    if (seconds < 1) {
      handleSuccess();
    }
  }, [seconds]);

  // Update gyro state
  useEffect(() => {
    if (isBuffering) return;

    const result = isStopped(gyro, accel);

    setCheckHistory(prev => {
        const next = [...prev, result];
        if (next.length > SAMPLES) next.shift();
        return next;
    });

  }, [gyro, accel]);

  // Check for failure condition only after countdown starts
  useEffect(() => {
    if (isBuffering) return;

    // Only start checking after at least 1 second has passed
    if (seconds < START_TIME && checkHistory.length === SAMPLES) {
      const trueCount = checkHistory.filter(x => x).length;
      if (trueCount < THRESHOLD) {
        handleFailure();
      }
    }
  }, [checkHistory, seconds]);

  return (
    <View style={globalStyles.stopContainer}>
      <Text style={globalStyles.title}>STOP!</Text>

      {/* {isBuffering && (
        <Text style={globalStyles.debugText}>Stabilizing...</Text>
      )}

      <Text style={globalStyles.timer}>{seconds}</Text>
      
      <Text style={globalStyles.status}>
        Device Stopped: {isStopped(gyro, accel) ? '✓' : '✗'}
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