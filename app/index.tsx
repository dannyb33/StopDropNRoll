// app/index.tsx
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '../styles/globalStyles';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useState } from 'react';

export default function StartScreen() {
  const router = useRouter();
  const [helpVisible, setHelpVisible] = useState(false);

  const handleStartGame = () => {
    router.push('/(game)/stop-phase'); // Navigate to your first game phase
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Stop, Drop, and Roll!</Text>

      <TouchableOpacity style={{marginBottom: 10, ...globalStyles.button}} onPress={handleStartGame}>
        <Text style={globalStyles.buttonText}>Start Game</Text>
      </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={() => router.replace('/(game)/leaderboard-screen')}>
        <Text style={globalStyles.buttonText}>View Leaderboard</Text>
      </TouchableOpacity>

      {/* Help Button */}
      <TouchableOpacity
        style={globalStyles.helpButton}
        onPress={() => setHelpVisible(true)}
      >
        <Text style={globalStyles.helpText}>?</Text>
      </TouchableOpacity>

      {/* Help Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={helpVisible}
        onRequestClose={() => setHelpVisible(false)}
      >
        <View style={globalStyles.modalBackground}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalText}>
              This is an interactive game to test your fire safety skills!{"\n"}{"\n"} Follow the prompts with your phone in your hand to stop, drop, and roll!{"\n"}{"\n"}
              Use the leaderboard to try and get a new record time!
            </Text>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => setHelpVisible(false)}
            >
              <Text style={globalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
}