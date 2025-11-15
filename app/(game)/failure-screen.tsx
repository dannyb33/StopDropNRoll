// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';

export default function StopScreen() {
  const router = useRouter();

  const handleStartGame = () => {
    router.replace('/'); // Navigate to your first game phase
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Fail!</Text>

      <TouchableOpacity style={globalStyles.button} onPress={handleStartGame}>
        <Text style={globalStyles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}