import axios from 'axios'
import { hiscores, parseJagexPlayerToJSON } from './const'

export const getPlayer = async (
	name: string,
	gamemode: (typeof hiscores.gamemodes)[number] = 'normal'
) => {
	try {
		const endpoint = hiscores.endpoints[gamemode]
		if (!endpoint) {
			throw new Error(`Invalid gamemode: ${gamemode}`)
		}
		const response = await axios.get(`${endpoint}?player=${name}`)
		const player = parseJagexPlayerToJSON(response.data.body)
		if (!player) throw new Error('getPlayer error: player data is invalid')
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
