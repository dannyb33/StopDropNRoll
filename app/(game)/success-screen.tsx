// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';
import { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { soundManager } from '@/hooks/soundUtils';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function StopScreen() {
    const router = useRouter();

    const { saveRun, currentDropTime, currentRollTime, getLeaderboard } = useGame();

    const handleStartGame = () => {
        router.replace('/'); // Navigate to your first game phase
    };

    const updateLeaderboard = async (currDropTime: number, currRollTime: number) => {
        await saveRun(currDropTime, currRollTime);
    }

    useEffect(() => {
        if (currentDropTime == null || currentRollTime == null) throw Error;

        soundManager.play('win');
        
        updateLeaderboard(currentDropTime, currentRollTime);

    }, []);

    const confettiRef = useRef<ConfettiCannon>(null);

    const triggerConfetti = () => {
        confettiRef.current?.start();
    };

    return (
        <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Success!</Text>

        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />

        <TouchableOpacity style={globalStyles.button} onPress={handleStartGame}>
            <Text style={globalStyles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
        </View>
    );
}

