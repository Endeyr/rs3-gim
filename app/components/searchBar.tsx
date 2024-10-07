'use client'

import { PlayerDataI } from '@/types/playerData'
import { useEffect, useState } from 'react'
import SearchBarForm from './searchBarForm'
import XpTable from './xpTable'

// TODO refactor, test page and components
const SearchBar = () => {
	const [playerData, setPlayerData] = useState<PlayerDataI | null>(null)

	useEffect(() => {
		const savedPlayerData = localStorage.getItem('playerData')
		if (savedPlayerData) {
			setPlayerData(JSON.parse(savedPlayerData) as PlayerDataI)
		}
	}, [])

	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setUserInput(e.target.value)
	// }

	// const searchName = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault()
	// 	if (userInput.trim() !== '') {
	// 		setIsLoading(true)
	// 		setError('')
	// 		try {
	// 			setName(userInput)
	// 			const gamemode = 'normal'
	// 			const response = await axios(
	// 				`/api?username=${userInput}&gamemode=${gamemode}`
	// 			)
	// 			if (response.status === 200) {
	// 				setPlayerData(response.data)
	// 				localStorage.setItem('playerData', JSON.stringify(response.data))
	// 			} else {
	// 				throw new Error(`Failed to fetch data, status: ${response.status}`)
	// 			}
	// 		} catch (error) {
	// 			setError('Error fetching player data.')
	// 			console.error(error)
	// 		} finally {
	// 			setIsLoading(false)
	// 			setUserInput('')
	// 		}
	// 	}
	// }

	return (
		<>
			{playerData ? (
				<>
					<XpTable playerData={playerData} />
				</>
			) : (
				<>
					<SearchBarForm setPlayerData={setPlayerData} />
				</>
			)}
		</>
	)
}
export default SearchBar
