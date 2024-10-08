'use client'

import { PlayerContextI } from '@/types/context'
import { PlayerDataI } from '@/types/playerData'
import { createContext, useCallback, useState } from 'react'

const defaultPlayerContext: PlayerContextI = {
	playerData: null,
	username: '',
	isLoading: false,
	error: '',
	updatePlayerData: () => {},
	updateUsername: () => {},
	updateIsLoading: () => {},
	updateError: () => {},
}

export const PlayerContext = createContext<PlayerContextI>(defaultPlayerContext)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [playerData, setPlayerData] = useState<PlayerDataI | null>(null)
	const [username, setUsername] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const updatePlayerData = useCallback((newPlayerData: PlayerDataI | null) => {
		setPlayerData(newPlayerData)
		try {
			if (newPlayerData) {
				localStorage.setItem('playerData', JSON.stringify(newPlayerData))
			} else {
				localStorage.removeItem('playerData')
			}
		} catch (error) {
			console.error(`Failed to update localStorage: ${error}`)
		}
	}, [])

	const updateUsername = useCallback((newUsername: string) => {
		setUsername(newUsername)
		try {
			localStorage.setItem('username', newUsername)
		} catch (error) {
			console.error(`Failed to update localStorage: ${error}`)
		}
	}, [])

	const updateIsLoading = useCallback((newIsLoading: boolean) => {
		setIsLoading(newIsLoading)
	}, [])
	const updateError = useCallback((newError: string) => {
		setError(newError)
	}, [])

	return (
		<PlayerContext.Provider
			value={{
				playerData,
				updatePlayerData,
				username,
				updateUsername,
				isLoading,
				updateIsLoading,
				error,
				updateError,
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}
