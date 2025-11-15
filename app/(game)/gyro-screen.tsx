// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { isStopped } from '../sensors/sensorUtils';
import { SensorData, useSensors } from '../sensors/useSensors';

export default function StopScreen() {
  const START_TIME = 5;
  const SAMPLES = 5;
  const THRESHOLD = 3;

  const [seconds, setSeconds] = useState(START_TIME);

  const { gyro, accel } = useSensors();
  const [checkHistory, setCheckHistory] = useState<boolean[]>([]);
  
  const router = useRouter();

  const handleSuccess = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>STOP!</Text>

      <Text style={styles.timer}>{seconds}</Text>
      
      <Text style={styles.status}>
        Device Stopped: {isStopped(gyro, accel) ? '✓' : '✗'}
      </Text>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          Gyro: x:{gyro.x.toFixed(2)} y:{gyro.y.toFixed(2)} z:{gyro.z.toFixed(2)}
        </Text>
        <Text style={styles.debugText}>
          Accel: x:{accel.x.toFixed(2)} y:{accel.y.toFixed(2)} z:{accel.z.toFixed(2)}
        </Text>
      </View>

      {/* Debug button - remove in production */}
      <TouchableOpacity style={styles.button} onPress={handleSuccess}>
        <Text style={styles.buttonText}>Skip (Debug)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1e1e2f',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  status: {
    fontSize: 24,
    color: '#ccc',
    marginBottom: 30,
  },
  debugInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2a2a3e',
    borderRadius: 10,
    width: '100%',
  },
  debugText: {
    fontSize: 12,
    color: '#aaa',
    marginVertical: 2,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#666',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});