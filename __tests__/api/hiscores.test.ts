import { getPlayer } from '@/lib/api/hiscores'
import axios from 'axios'
import {
	mockParsedPlayerData,
	mockPlayerResponseBody,
} from '../../__mocks__/mockTestData'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('hiscores api calls', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it('gets player by name successfully', async () => {
		// Mock axios response
		mockedAxios.get.mockResolvedValueOnce({ data: mockPlayerResponseBody })

		// Call the function
		const player = await getPlayer('testPlayer')

		// Assertions
		expect(player).toEqual({
			...mockParsedPlayerData,
			timestamp: expect.any(Date),
		})
		expect(mockedAxios.get).toHaveBeenCalledWith(
			expect.stringContaining('testPlayer'),
			expect.objectContaining({ timeout: 10000 })
		)
	})
})
