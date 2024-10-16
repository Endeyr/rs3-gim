import axios from 'axios'
import {
	getMonthlyXpData,
	getProfileData,
	getQuestData,
} from './../../lib/api/runemetrics'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('runemetrics api calls', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('getProfileData', () => {
		it('', async () => {
			mockedAxios.get.mockResolvedValueOnce({})

			const player = await getProfileData('testPlayer')

			expect(player).toEqual({})

			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('testPlayer')
			)
		})
	})

	describe('getMonthlyXpData', () => {
		it('', async () => {
			mockedAxios.get.mockResolvedValueOnce({})

			const player = await getMonthlyXpData('testPlayer', 1)

			expect(player).toEqual({})

			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('testPlayer')
			)
		})
	})

	describe('getQuestData', () => {
		it('', async () => {
			mockedAxios.get.mockResolvedValueOnce({})

			const player = await getQuestData('testPlayer')

			expect(player).toEqual({})

			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('testPlayer')
			)
		})
	})
})
