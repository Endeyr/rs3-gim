'use client'

import { PlayerContextI } from '@/types/context'
import { PlayerDataI } from '@/types/playerData'
import { useContext, useEffect } from 'react'
import { PlayerContext } from '../context/playerContext'
import SearchBar from './searchBar'
import XpTable from './xpTable'

const Dashboard = () => {
	const { playerDataArray, updatePlayerDataArray } = useContext(
		PlayerContext
	) as PlayerContextI

	useEffect(() => {
		const savedPlayerDataArray = localStorage.getItem('playerDataArray')
		if (savedPlayerDataArray) {
			try {
				const playerDataArray = JSON.parse(
					savedPlayerDataArray
				) as PlayerDataI[]
				updatePlayerDataArray(playerDataArray)
			} catch (error) {
				console.error(`Failed to parse player data from localStorage: ${error}`)
			}
		}
	}, [updatePlayerDataArray])

	return (
		<div className="space-y-4">
			<SearchBar />
			{playerDataArray.length === 0 ? (
				<p>No players found. Please add some players.</p>
			) : (
				playerDataArray.map((playerData) => (
					<div key={playerData.username} className="w-[35dvw]">
						<XpTable playerData={playerData} />
					</div>
				))
			)}
		</div>
	)
}

export default Dashboard
