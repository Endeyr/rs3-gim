import { Quests } from '@/types/api';
import { PlayerDataI } from '@/types/playerData';
import axios from 'axios';

export const fetchProfileAndQuests = async (
  username: string,
  signal: AbortSignal,
  updatePlayerData: (newPlayerData: PlayerDataI) => void
) => {
  const [profileResponse, questResponse] = await Promise.allSettled([
    axios<PlayerDataI>(
      `/api/runemetrics/getProfile?name=${encodeURIComponent(username)}`,
      {
        signal,
      }
    ),
    axios<Quests>(
      `/api/runemetrics/getQuest?name=${encodeURIComponent(username)}`,
      {
        signal,
      }
    ),
  ]);

  if (
    profileResponse.status === 'fulfilled' &&
    profileResponse.value.status === 200 &&
    questResponse.status === 'fulfilled' &&
    questResponse.value.status === 200
  ) {
    const data = {
      ...profileResponse.value.data,
      quests: questResponse.value.data.quests,
    };
    updatePlayerData(data);
  } else {
    if (signal.aborted) {
      throw new Error('Request aborted');
    }
    throw new Error('Failed to fetch profile or quest data');
  }
};
