'use client'

import type { PlayerContextI } from '@/types/context'
import type { PlayerDataI } from '@/types/playerData'
import type { MonthlyXpI } from '@/types/xpData'
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
	monthlyXpDataArray: [],
	updateMonthlyXpDataArray: () => {},
	updateMonthlyXpData: () => {},
	removeMonthlyXpData: () => {},
}

export const PlayerContext = createContext<PlayerContextI>(defaultPlayerContext)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [playerDataArray, setPlayerDataArray] = useState<PlayerDataI[]>([])
	const [monthlyXpDataArray, setMonthlyXpDataArray] = useState<MonthlyXpI[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [isSuccess, setIsSuccess] = useState(true)
	const [message, setMessage] = useState('')

	useEffect(() => {
		const savedPlayerDataArray = localStorage.getItem('playerDataArray')
		const savedMonthlyXpData = localStorage.getItem('monthlyXpDataArray')

		if (savedPlayerDataArray) {
			try {
				setPlayerDataArray(JSON.parse(savedPlayerDataArray))
			} catch (error) {
				console.error('Failed to parse player data from localStorage:', error)
			}
		}

		if (savedMonthlyXpData) {
			try {
				setMonthlyXpDataArray(JSON.parse(savedMonthlyXpData))
			} catch (error) {
				console.error(
					'Failed to parse monthly XP data from localStorage:',
					error
				)
			}
		}

		setIsLoading(false)
	}, [])

	const updatePlayerDataArray = useCallback(
		(newPlayerDataArray: PlayerDataI[]) => {
			setPlayerDataArray((prevData) => {
				const newData = newPlayerDataArray.filter(
					(newPlayer) =>
						!prevData.some((prevPlayer) => prevPlayer.name === newPlayer.name)
				)

				if (newData.length === 0) return prevData

				const combinedData = [...prevData, ...newData]

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

			const isDataUpdated =
				existingPlayerIndex !== -1 &&
				JSON.stringify(prevData[existingPlayerIndex]) ===
					JSON.stringify(newPlayerData)
			if (isDataUpdated) return prevData

			const updatedData =
				existingPlayerIndex !== -1
					? [
							...prevData.slice(0, existingPlayerIndex),
							newPlayerData,
							...prevData.slice(existingPlayerIndex + 1),
					  ]
					: [...prevData, newPlayerData]

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

			if (updatedData.length === prevData.length) return prevData

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

	const updateMonthlyXpDataArray = useCallback(
		(newMonthlyXpDataArray: MonthlyXpI[]) => {
			setMonthlyXpDataArray((prevData) => {
				const newData = newMonthlyXpDataArray.filter(
					(newPlayer) =>
						!prevData.some((prevPlayer) => prevPlayer.name === newPlayer.name)
				)

				if (newData.length === 0) return prevData

				const combinedData = [...prevData, ...newData]

				try {
					localStorage.setItem(
						'monthlyXpDataArray',
						JSON.stringify(combinedData)
					)
				} catch (error) {
					console.error(`Failed to update localStorage: ${error}`)
				}

				return combinedData
			})
		},
		[]
	)

	const updateMonthlyXpData = useCallback((newMonthlyData: MonthlyXpI) => {
		setMonthlyXpDataArray((prevData) => {
			const existingPlayerIndex = prevData.findIndex(
				(player) => player.name === newMonthlyData.name
			)
			const existingPlayer = prevData[existingPlayerIndex]
			if (existingPlayer) {
				const updatedSkills = [...existingPlayer.monthlyXpGain]
				newMonthlyData.monthlyXpGain.forEach((newSkillData) => {
					const existingSkillIndex = updatedSkills.findIndex(
						(skill) => skill.skillName === newSkillData.skillName
					)
					if (existingSkillIndex !== -1) {
						updatedSkills[existingSkillIndex] = newSkillData
					} else {
						updatedSkills.push(newSkillData)
					}
				})
				const updatedPlayer = {
					...existingPlayer,
					monthlyXpGain: updatedSkills,
				}
				const updatedData = [
					...prevData.slice(0, existingPlayerIndex),
					updatedPlayer,
					...prevData.slice(existingPlayerIndex + 1),
				]
				try {
					localStorage.setItem(
						'monthlyXpDataArray',
						JSON.stringify(updatedData)
					)
				} catch (error) {
					console.error(`Failed to update localStorage: ${error}`)
				}
				return updatedData
			} else {
				const updatedData = [...prevData, newMonthlyData]
				try {
					localStorage.setItem(
						'monthlyXpDataArray',
						JSON.stringify(updatedData)
					)
				} catch (error) {
					console.error(`Failed to update localStorage: ${error}`)
				}
				return updatedData
			}
		})
	}, [])

	const removeMonthlyXpData = useCallback((name: string) => {
		setMonthlyXpDataArray((prevData) => {
			const updatedData = prevData.filter((player) => player.name !== name)

			if (updatedData.length === prevData.length) return prevData

			try {
				localStorage.setItem(`monthlyXpDataArray`, JSON.stringify(updatedData))
			} catch (error) {
				console.error(`Failed to update localStorage: ${error}`)
			}

			return updatedData
		})
	}, [])

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
				monthlyXpDataArray,
				updateMonthlyXpDataArray,
				updateMonthlyXpData,
				removeMonthlyXpData,
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}
