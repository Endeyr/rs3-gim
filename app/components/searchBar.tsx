'use client'

import { PlayerDataI } from '@/types/playerData'
import { useEffect, useState } from 'react'
import SearchBarForm from './searchBarForm'
import XpTable from './xpTable'

// TODO update based on timestamps, track old vs new xp gains, use getServerSideProps / getStaticProps for data fetching over axios, use SWR for data fetching / caching
const SearchBar = () => {
	const [playerData, setPlayerData] = useState<PlayerDataI | null>(null)
	const [username, setUsername] = useState('')

	useEffect(() => {
		const savedPlayerData = localStorage.getItem('playerData')
		if (savedPlayerData) {
			setPlayerData(JSON.parse(savedPlayerData) as PlayerDataI)
		}
	}, [])

	return (
		<>
			{playerData ? (
				<>
					<p>{new Date(playerData.timestamp).toLocaleString()}</p>
					<XpTable playerData={playerData} username={username} />
				</>
			) : (
				<>
					<SearchBarForm
						setPlayerData={setPlayerData}
						setUsername={setUsername}
					/>
				</>
			)}
		</>
	)
}
export default SearchBar
