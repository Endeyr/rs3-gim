import { mockParsedPlayerData } from '@/__mocks__/mockTestData'
import { PlayerContext } from '@/app/context/playerContext'
import { PlayerDataI } from '@/types/playerData'

interface MockPlayerProviderPropsI {
	children: React.ReactNode
	playerData?: PlayerDataI | null
	username?: string
	isLoading?: boolean
	error?: string
}

const MockPlayerProvider: React.FC<MockPlayerProviderPropsI> = ({
	children,
	playerData = mockParsedPlayerData,
	username = 'testUser',
	isLoading = false,
	error = '',
}) => {
	return (
		<PlayerContext.Provider
			value={{
				playerData,
				updatePlayerData: jest.fn(), // Mock function
				username,
				updateUsername: jest.fn(), // Mock function
				isLoading,
				updateIsLoading: jest.fn(), // Mock function
				error,
				updateError: jest.fn(), // Mock function
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}
export default MockPlayerProvider
