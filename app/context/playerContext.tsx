'use client'

import { PlayerContextI } from '@/types/context'
import { PlayerDataI } from '@/types/playerData'
import { createContext, useCallback, useEffect, useState } from 'react'

const defaultPlayerContext: PlayerContextI = {
	playerDataArray: [],
	isLoading: true,
	isError: false,
	isSuccess: false,
	message: '',
	updatePlayerDataArray: () => {},
	updatePlayerData: () => {},
	removePlayerData: () => {},
	updateIsLoading: () => {},
	setStatus: () => {},
}

export const PlayerContext = createContext<PlayerContextI>(defaultPlayerContext)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [playerDataArray, setPlayerDataArray] = useState<PlayerDataI[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [isSuccess, setIsSuccess] = useState(true)
	const [message, setMessage] = useState('')

	useEffect(() => {
		const savedPlayerDataArray = localStorage.getItem('playerDataArray')
		if (savedPlayerDataArray) {
			try {
				setPlayerDataArray(JSON.parse(savedPlayerDataArray))
			} catch (error) {
				console.error('Failed to parse player data from localStorage:', error)
			}
		}
		setIsLoading(false)
	}, [])

	const updatePlayerDataArray = useCallback(
		(newPlayerDataArray: PlayerDataI[]) => {
			setPlayerDataArray((prevData) => {
				const combinedData = [
					...prevData,
					...newPlayerDataArray.filter(
						(newPlayer) =>
							!prevData.some((prevPlayer) => prevPlayer.name === newPlayer.name)
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
		newPlayerData.skillvalues.sort((a, b) => a.id - b.id)
		setPlayerDataArray((prevData) => {
			const existingPlayerIndex = prevData.findIndex(
				(player) => player.name === newPlayerData.name
			)

			let updatedData: PlayerDataI[]
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

	const removePlayerData = useCallback((name: string) => {
		setPlayerDataArray((prevData) => {
			const updatedData = prevData.filter((player) => player.name !== name)

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

	const setStatus = useCallback(
		(newMessage: string, type: 'error' | 'success' | 'reset') => {
			setMessage(newMessage)
			setIsError(type === 'error')
			setIsSuccess(type === 'success')
			if (type === 'reset') {
				setIsError(false)
				setIsSuccess(false)
			}
		},
		[]
	)

	return (
		<PlayerContext.Provider
			value={{
				playerDataArray,
				updatePlayerDataArray,
				updatePlayerData,
				removePlayerData,
				isLoading,
				updateIsLoading,
				isError,
				setStatus,
				isSuccess,

				message,
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}
