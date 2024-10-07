import type { PlayerJSON } from '@/types/api'
import axios from 'axios'
import { hiscores, parseJagexPlayerToJSON } from './const'

export const getPlayer = async (
	name: string,
	gamemode: (typeof hiscores.gamemodes)[number] = 'normal'
): Promise<PlayerJSON> => {
	try {
		const endpoint = hiscores.endpoints[gamemode]
		if (!endpoint) {
			throw new Error(`Invalid gamemode: ${gamemode}`)
		}
		const url = `${endpoint}?player=${name}`
		const response = await axios.get(url)
		const data = response.data
		if (!data || typeof data !== 'string') {
			throw new Error('API response data is invalid or undefined', data)
		}

		const player = parseJagexPlayerToJSON(data)
		if (!player) throw new Error('getPlayer error: player data is invalid')
		player.timestamp = new Date()
		return player
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(`getPlayer error: ${error.message}`)
		} else if (error instanceof Error) {
			throw new Error(`getPlayer error: ${error.message}`)
		} else {
			throw new Error('getPlayer error: an unknown error occurred')
		}
	}
}
