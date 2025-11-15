// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useSensors } from '../sensors/useSensors';
import { isRolling, isStopped } from '../sensors/sensorUtils';
import { globalStyles } from '../../styles/globalStyles';
import { useGame } from '@/context/GameContext';
import { soundManager } from '@/hooks/soundUtils';

export default function RollScreen() {
  const BUFFER_TIME = 500;

  const SAMPLES = 5;
  const THRESHOLD = 3;
  const TIME_LIMIT = 3;

  const [seconds, setSeconds] = useState(TIME_LIMIT);
  const [isBuffering, setIsBuffering] = useState(true);
  
  const router = useRouter();

  const { gyro, accel } = useSensors();
  const [checkHistory, setCheckHistory] = useState<boolean[]>([]);

  const hasNavigated = useRef(false);

  const { startRollTimer, endRollTimer } = useGame();

  const handleSuccess = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    soundManager.play('ding');

    const rollTime = endRollTimer();
    console.log("Roll took ", rollTime, " ms.")

    router.replace('/(game)/success-screen');
  };

  const handleFailure = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    soundManager.play('buzzer');

    router.replace('/(game)/failure-screen');
  };

  useEffect(() => {
    soundManager.play('roll');
  }, []);

  // Buffer period - ignore sensor data for first 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Buffer period ended, starting roll detection');
      startRollTimer();
      
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

  // Fail when timer runs out
  useEffect(() => {
    if (seconds < 1) {
      handleFailure();
    }
  }, [seconds]);

  // Update gyro state
  useEffect(() => {
    if (hasNavigated.current || isBuffering) return;

    const result = isRolling(gyro);

    setCheckHistory(prev => {
        const next = [...prev, result];
        if (next.length > SAMPLES) next.shift();
        return next;
    });

  }, [gyro, accel, isBuffering]);

    // Check for failure condition only after countdown starts
  useEffect(() => {
    if (hasNavigated.current || isBuffering) return;

    // Only start checking after at least 1 second has passed
    if (checkHistory.length === SAMPLES) {
      const trueCount = checkHistory.filter(x => x).length;
      if (trueCount > THRESHOLD) {
        handleSuccess();
      }
    }
  }, [checkHistory, isBuffering]);

  return (
    <View style={globalStyles.rollContainer}>
      <Text style={globalStyles.title}>ROLL!</Text>

      {/* {isBuffering && (
        <Text style={globalStyles.debugText}>Stabilizing...</Text>
      )} */}

      {/* <Text style={globalStyles.timer}>{seconds}</Text>
      
      <Text style={globalStyles.status}>
        Device Rolling: {isRolling(gyro) ? '✓' : '✗'}
      </Text>

      <View style={globalStyles.debugInfo}>
        <Text style={globalStyles.debugText}>
          Buffering: {isBuffering ? 'YES' : 'NO'}
        </Text>
        <Text style={globalStyles.debugText}>
          Gyro: x:{gyro.x.toFixed(2)} y:{gyro.y.toFixed(2)} z:{gyro.z.toFixed(2)}
        </Text>
        <Text style={globalStyles.debugText}>
          Accel: x:{accel.x.toFixed(2)} y:{accel.y.toFixed(2)} z:{accel.z.toFixed(2)}
        </Text>
        <Text style={globalStyles.debugText}>
          History: [{checkHistory.map(x => x ? '1' : '0').join(', ')}]
        </Text>
        <Text style={globalStyles.debugText}>
          True count: {checkHistory.filter(x => x).length}/{THRESHOLD}
        </Text>
      </View>

      {/* Debug button - remove in production */}
      {/* <TouchableOpacity style={globalStyles.button} onPress={handleSuccess}>
        <Text style={globalStyles.buttonText}>Skip (Debug)</Text>
      </TouchableOpacity> */}
    </View>
  );
}