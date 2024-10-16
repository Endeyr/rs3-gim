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

	const dynamicClasses =
		playerDataArray.length >= 5
			? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
			: playerDataArray.length === 3
			? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
			: playerDataArray.length === 2
			? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
			: playerDataArray.length === 1
			? 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
			: 'md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1'

	return (
		<div className="space-y-8">
			<ul className={`grid grid-cols-1 gap-4 ${dynamicClasses}`}>
				{playerDataArray.length === 0 ? (
					<li>No players found. Please add some players.</li>
				) : (
					playerDataArray.map((playerData) => (
						<li key={playerData.name} className="w-full">
							<XpTable playerData={playerData} />
						</li>
					))
				)}
				<li className="col-span-1 flex flex-col w-full gap-2 justify-start items-center">
					<SearchBar />
				</li>
			</ul>
		</div>
	)
}

export default Dashboard
