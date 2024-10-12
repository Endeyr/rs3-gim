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
		<div className="space-y-8">
			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{playerDataArray.length === 0 ? (
					<li>No players found. Please add some players.</li>
				) : (
					playerDataArray.map((playerData) => (
						<li key={playerData.username} className="w-full">
							<XpTable playerData={playerData} />
						</li>
					))
				)}
				<div className="col-span-1 flex flex-col w-full gap-2 justify-start items-center">
					<SearchBar />
				</div>
			</ul>
		</div>
	)
}

export default Dashboard
