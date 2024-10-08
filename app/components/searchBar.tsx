'use client'

import { PlayerDataI } from '@/types/playerData'
import { useEffect, useState } from 'react'
import SearchBarForm from './searchBarForm'
import XpTable from './xpTable'

// TODO update based on timestamps, track old vs new xp gains, manage global state
const SearchBar = () => {
	const [playerData, setPlayerData] = useState<PlayerDataI | null>(null)
	const [username, setUsername] = useState('')

	useEffect(() => {
		const savedPlayerData = localStorage.getItem('playerData')
		const savedUsername = localStorage.getItem('username')
		if (savedPlayerData) {
			try {
				setPlayerData(JSON.parse(savedPlayerData) as PlayerDataI)
			} catch (error) {
				setPlayerData(null)
				throw new Error(
					`Failed to parse player data from localStorage: ${error}`
				)
			}
		}
		if (savedUsername) {
			setUsername(savedUsername)
		}
	}, [])

	return (
		<>
			{playerData ? (
				<XpTable playerData={playerData} username={username} />
			) : (
				<SearchBarForm
					setPlayerData={setPlayerData}
					setUsername={setUsername}
				/>
			)}
		</>
	)
}
export default SearchBar
