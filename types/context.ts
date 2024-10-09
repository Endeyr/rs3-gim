import type { PlayerDataI } from './playerData'
export interface PlayerContextI {
	playerDataArray: PlayerDataI[]
	updatePlayerDataArray: (newPlayerDataArray: PlayerDataI[]) => void
	updatePlayerData: (newPlayerData: PlayerDataI) => void
	isLoading: boolean
	updateIsLoading: (newIsLoading: boolean) => void
	error: string
	updateError: (newError: string) => void
}
