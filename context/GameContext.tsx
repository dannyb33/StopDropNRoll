import { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type GameRun = {
  id: string;
  dropTime: number; // milliseconds
  rollTime: number; // milliseconds
  totalTime: number; // milliseconds
  timestamp: number; // Date.now()
};

type GameContextType = {
    dropStartTime: number | null;
    rollStartTime: number | null;
    startDropTimer: () => void;
    endDropTimer: () => number;
    startRollTimer: () => void;
    endRollTimer: () => number;
    
    currentDropTime: number | null;
    currentRollTime: number | null;
    
    saveRun: (dropTime: number, rollTime: number) => Promise<void>;
    getLeaderboard: () => Promise<GameRun[]>;
    clearLeaderboard: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const LEADERBOARD_KEY = '@stop_drop_roll:leaderboard';

export function GameProvider({ children }: { children: ReactNode }) {
    const [dropStartTime, setDropStartTime] = useState<number | null>(null);
    const [rollStartTime, setRollStartTime] = useState<number | null>(null);
    const [currentDropTime, setCurrentDropTime] = useState<number | null>(null);
    const [currentRollTime, setCurrentRollTime] = useState<number | null>(null);

    const startDropTimer = () => {
        setDropStartTime(Date.now());
    };

    const endDropTimer = () => {
        if (!dropStartTime) return 0;
        const elapsed = Date.now() - dropStartTime;
        setCurrentDropTime(elapsed);
        return elapsed;
    };

    const startRollTimer = () => {
        setRollStartTime(Date.now());
    };

    const endRollTimer = () => {
        if (!rollStartTime) return 0;
        const elapsed = Date.now() - rollStartTime;
        setCurrentRollTime(elapsed);
        return elapsed;
    };

    const saveRun = async (dropTime: number, rollTime: number) => {
        try {
            // Get existing leaderboard
            const leaderboard = await getLeaderboard();
            
            // Create new run
            const newRun: GameRun = {
                id: Date.now().toString(),
                dropTime,
                rollTime,
                totalTime: dropTime + rollTime,
                timestamp: Date.now(),
            };
            
            // Add to leaderboard
            leaderboard.push(newRun);
            
            // Sort by total time (fastest first)
            leaderboard.sort((a, b) => a.totalTime - b.totalTime);
            
            // Keep top 10
            const top10 = leaderboard.slice(0, 10);
            
            // Save back to storage
            await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
            
            console.log('Saved run to leaderboard:', newRun);
            } catch (error) {
                console.error('Failed to save run:', error);
            }
    };

    const getLeaderboard = async (): Promise<GameRun[]> => {
        try {
            const data = await AsyncStorage.getItem(LEADERBOARD_KEY);
            if (data) {
                return JSON.parse(data);
            }
            return [];
            } catch (error) {
                console.error('Failed to get leaderboard:', error);
                return [];
        }
    };

    const clearLeaderboard = async () => {
        try {
            await AsyncStorage.removeItem(LEADERBOARD_KEY);

            console.log('Leaderboard cleared');
            } catch (error) {
                console.error('Failed to clear leaderboard:', error);
            }
    };

    return (
        <GameContext.Provider
            value={{
                dropStartTime,
                rollStartTime,
                startDropTimer,
                endDropTimer,
                startRollTimer,
                endRollTimer,
                currentDropTime,
                currentRollTime,
                saveRun,
                getLeaderboard,
                clearLeaderboard,
            }}
            >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within GameProvider');
    return context;
}

// Helper function to format time
export function formatTime(ms: number): string {
    if (ms < 1000) {
        return `${ms}ms`;
    }
    const seconds = (ms / 1000).toFixed(2);
    return `${seconds}s`;
}