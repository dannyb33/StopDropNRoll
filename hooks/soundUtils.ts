import { createAudioPlayer } from 'expo-audio';

class SoundManager {
  private players: Record<string, ReturnType<typeof createAudioPlayer>> = {};

  async load(name: string, source: any) {
    const player = createAudioPlayer();
    await player.replace(source);
    this.players[name] = player;
  }
  
  async play(name: string) {
    const player = this.players[name];
    if (!player) return;

    try {
      await player.seekTo(0);
      await player.play();
    } catch (err) {
      console.error('Sound play error:', err);
    }
  }
}

export const soundManager = new SoundManager();