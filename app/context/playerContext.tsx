'use client'

import { PlayerContextI } from '@/types/context'
import { PlayerDataI } from '@/types/playerData'
import { createContext, useCallback, useState } from 'react'

const defaultPlayerContext: PlayerContextI = {
	playerDataArray: [],
	isLoading: false,
	error: '',
	updatePlayerDataArray: () => {},
	updatePlayerData: () => {},
	updateIsLoading: () => {},
	updateError: () => {},
}

export const PlayerContext = createContext<PlayerContextI>(defaultPlayerContext)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [playerDataArray, setPlayerDataArray] = useState<PlayerDataI[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const updatePlayerDataArray = useCallback(
		(newPlayerDataArray: PlayerDataI[]) => {
			setPlayerDataArray((prevData) => {
				const combinedData = [
					...prevData,
					...newPlayerDataArray.filter(
						(newPlayer) =>
							!prevData.some(
								(prevPlayer) => prevPlayer.username === newPlayer.username
							)
					),
				]

				try {
					localStorage.setItem('playerDataArray', JSON.stringify(combinedData))
				} catch (error) {
					console.error(`Failed to update localStorage: ${error}`)
				}

				return combinedData
			})
		},
		[]
	)

	const updatePlayerData = useCallback((newPlayerData: PlayerDataI) => {
		setPlayerDataArray((prevData) => {
			const existingPlayerIndex = prevData.findIndex(
				(player) => player.username === newPlayerData.username
			)

			let updatedData
			if (existingPlayerIndex !== -1) {
				updatedData = [
					...prevData.slice(0, existingPlayerIndex),
					newPlayerData,
					...prevData.slice(existingPlayerIndex + 1),
				]
			} else {
				updatedData = [...prevData, newPlayerData]
			}

			try {
				localStorage.setItem(`playerDataArray`, JSON.stringify(updatedData))
			} catch (error) {
				console.error(`Failed to update localStorage: ${error}`)
			}

			return updatedData
		})
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
				playerDataArray,
				updatePlayerDataArray,
				updatePlayerData,
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
