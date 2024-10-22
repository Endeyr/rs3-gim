import type { PlayerDataI } from './playerData';
import { MonthlyXpI } from './xpData';
export interface PlayerContextI {
  playerDataArray: PlayerDataI[];
  updatePlayerDataArray: (newPlayerDataArray: PlayerDataI[]) => void;
  updatePlayerData: (newPlayerData: PlayerDataI) => void;
  removePlayerData: (username: string) => void;
  isLoading: boolean;
  updateIsLoading: (newIsLoading: boolean) => void;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  setStatus: (newMessage: string, type: 'error' | 'success' | 'reset') => void;
  monthlyXpDataArray: MonthlyXpI[];
  updateMonthlyXpDataArray: (newMonthlyXpDataArray: MonthlyXpI[]) => void;
  updateMonthlyXpData: (newMonthlyXpData: MonthlyXpI) => void;
  removeMonthlyXpData: (username: string) => void;
}
