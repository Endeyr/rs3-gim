import { getPlayer } from '@/lib/api'
import axios from 'axios'
import { mockParsedPlayerData, mockPlayerResponseBody } from '../lib/testData'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API', () => {
	it('getsPlayer by name', async () => {
		// Mocked API response
		const mockPlayerData = {
			body: mockPlayerResponseBody,
		}

		// player obj from await getPlayer()
		const mockParsedPlayer = mockParsedPlayerData

		// Mock axios response
		mockedAxios.get.mockResolvedValueOnce({ data: mockPlayerData })

		// Call the function
		const player = await getPlayer('player1')

		// Assertions
		expect(player).toEqual(mockParsedPlayer)
		expect(mockedAxios.get).toHaveBeenCalledWith(
			expect.stringContaining('player1')
		)
	})
})
