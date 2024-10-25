import { PlayerContext } from '@/app/context/playerContext';
import { PlayerDataI } from '@/types/playerData';
import { MonthlyXpI } from '@/types/xpData';
import {
  mockRunemetricsMonthlyXpDataArray,
  mockRunemetricsProfileDataArray,
} from './mockTestData';

interface MockPlayerProviderPropsI {
  children: React.ReactNode;
  playerDataArray?: PlayerDataI[];
  updatePlayerDataArray?: (newPlayerDataArray: PlayerDataI[]) => void;
  updatePlayerData?: (newPlayerData: PlayerDataI) => void;
  removePlayerData?: (username: string) => void;
  isLoading?: boolean;
  updateIsLoading?: (newIsLoading: boolean) => void;
  isError?: boolean;
  isSuccess?: boolean;
  message?: string;
  setStatus?: (
    newMessage: string,
    type: 'error' | 'success' | 'reset' | 'info'
  ) => void;
  monthlyXpDataArray?: MonthlyXpI[];
  updateMonthlyXpDataArray?: (newMonthlyXpDataArray: MonthlyXpI[]) => void;
  updateMonthlyXpData?: (newMonthlyXpData: MonthlyXpI) => void;
  removeMonthlyXpData?: (username: string) => void;
}

const MockPlayerProvider: React.FC<MockPlayerProviderPropsI> = ({
  children,
  playerDataArray = mockRunemetricsProfileDataArray,
  updatePlayerData = jest.fn(),
  updatePlayerDataArray = jest.fn(),
  removePlayerData = jest.fn(),
  isLoading = false,
  isError = false,
  isSuccess = false,
  message = '',
  monthlyXpDataArray = mockRunemetricsMonthlyXpDataArray,
  updateIsLoading = jest.fn(),
  setStatus = jest.fn(),
  updateMonthlyXpDataArray = jest.fn(),
  updateMonthlyXpData = jest.fn(),
  removeMonthlyXpData = jest.fn(),
}) => {
  return (
    <PlayerContext.Provider
      value={{
        playerDataArray,
        updatePlayerData,
        updatePlayerDataArray,
        removePlayerData,
        isLoading,
        updateIsLoading,
        isError,
        isSuccess,
        message,
        setStatus,
        monthlyXpDataArray,
        updateMonthlyXpDataArray,
        updateMonthlyXpData,
        removeMonthlyXpData,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
export default MockPlayerProvider;
