import type { PlayerDataI } from './playerData'
export interface PlayerContextI {
	username: string
	playerData: PlayerDataI | null
	updatePlayerData: (newPlayerData: PlayerDataI | null) => void
	updateUsername: (newUsername: string) => void
	isLoading: boolean
	updateIsLoading: (newIsLoading: boolean) => void
	error: string
	updateError: (newError: string) => void
}
