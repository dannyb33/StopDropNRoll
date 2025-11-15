
// app/leaderboard.tsx
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useGame, formatTime, GameRun } from '../../context/GameContext';
import { globalStyles } from '@/styles/globalStyles';

export default function LeaderboardScreen() {
  const router = useRouter();

  const { getLeaderboard, clearLeaderboard } = useGame();
  const [leaderboard, setLeaderboard] = useState<GameRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard();
      console.log('✅ Loaded leaderboard:', data);
      setLeaderboard(data);
    } catch (error) {
      console.error('❌ Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    Alert.alert(
      'Clear Leaderboard',
      'Are you sure you want to delete all scores?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearLeaderboard();
            await loadLeaderboard();
          },
        },
      ]
    );
  };

  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <View style={globalStyles.container}>
      <Text style={{ marginTop: 60, ...globalStyles.title }}>🏆 Leaderboard</Text>

      {loading ? (
        <Text style={globalStyles.loadingText}>Loading...</Text>
      ) : leaderboard.length === 0 ? (
        <View style={globalStyles.emptyContainer}>
          <Text style={globalStyles.emptyText}>No runs yet!</Text>
          <Text style={globalStyles.subtitle}>Complete a game to see your score here</Text>
        </View>
      ) : (
        <ScrollView style={globalStyles.scrollView} contentContainerStyle={globalStyles.scrollContent}>
          {leaderboard.map((run, index) => (
            <View
              key={run.id}
              style={[
                globalStyles.row,
                index < 3 && globalStyles.topThree,
                index === 0 && globalStyles.firstPlace,
              ]}
            >
              <View style={globalStyles.rankContainer}>
                <Text style={[globalStyles.rank, index < 3 && globalStyles.medalRank]}>
                  {getMedalEmoji(index)}
                </Text>
              </View>

              <View style={globalStyles.timesContainer}>
                <View style={globalStyles.timeRow}>
                  <Text style={globalStyles.timeLabel}>Drop:</Text>
                  <Text style={globalStyles.timeValue}>{formatTime(run.dropTime)}</Text>
                </View>
                <View style={globalStyles.timeRow}>
                  <Text style={globalStyles.timeLabel}>Roll:</Text>
                  <Text style={globalStyles.timeValue}>{formatTime(run.rollTime)}</Text>
                </View>
                <View style={[globalStyles.timeRow, globalStyles.totalRow]}>
                  <Text style={globalStyles.totalLabel}>Total:</Text>
                  <Text style={globalStyles.totalValue}>{formatTime(run.totalTime)}</Text>
                </View>
              </View>

              <View style={globalStyles.dateContainer}>
                <Text style={globalStyles.dateText}>
                  {new Date(run.timestamp).toLocaleDateString()}
                </Text>
                <Text style={globalStyles.timeText}>
                  {new Date(run.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          style={{marginBottom: 20, ...globalStyles.backButton}}
          onPress={() => router.replace('/')}
        >
          <Text style={globalStyles.buttonText}>Back</Text>
        </TouchableOpacity>

        {leaderboard.length > 0 && (
          <TouchableOpacity
            style={{marginBottom: 20, ...globalStyles.clearButton}}
            onPress={handleClear}
          >
            <Text style={globalStyles.buttonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}