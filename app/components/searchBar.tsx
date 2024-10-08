'use client'

import { PlayerContextI } from '@/types/context'
import { PlayerDataI } from '@/types/playerData'
import { useContext, useEffect } from 'react'
import { PlayerContext } from '../context/playerContext'
import SearchBarForm from './searchBarForm'

// TODO update based on timestamps, track old vs new xp gains
const SearchBar = () => {
	const { updatePlayerData, updateUsername } = useContext(
		PlayerContext
	) as PlayerContextI

	useEffect(() => {
		const savedPlayerData = localStorage.getItem('playerData')
		const savedUsername = localStorage.getItem('username')
		if (savedPlayerData) {
			try {
				updatePlayerData(JSON.parse(savedPlayerData) as PlayerDataI)
			} catch (error) {
				console.error(`Failed to parse player data from localStorage: ${error}`)
				updatePlayerData(null)
			}
		}
		if (savedUsername) {
			updateUsername(savedUsername)
		}
	}, [updatePlayerData, updateUsername])

	return (
		<>
			<SearchBarForm />
		</>
	)
}
export default SearchBar
