'use client'

import axios from 'axios'
import { useState } from 'react'

interface ActivityI {
	rank: number
	count: number
}

interface SkillI {
	rank: number
	level: number
	experience: number
}

interface PlayerDataI {
	activities: Record<string, ActivityI>
	skills: Record<string, SkillI>
}

export default function Home() {
	const [userInput, setUserInput] = useState('')
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [playerData, setPlayerData] = useState<PlayerDataI | null>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value)
	}
	const searchName = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (userInput.trim() !== '') {
			setIsLoading(true)
			setError('')
			try {
				setName(userInput)
				const gamemode = 'normal'
				const response = await axios(
					`/api?username=${userInput}&gamemode=${gamemode}`
				)
				if (response.status === 200) {
					setPlayerData(response.data)
				} else {
					throw new Error(`Failed to fetch data, status: ${response.status}`)
				}
			} catch (error) {
				setError('Error fetching player data.')
				console.error(error)
			} finally {
				setIsLoading(false)
				setUserInput('')
			}
		}
	}

	return (
		<div>
			<h1>Home</h1>
			{name && <h2>Name: {name}</h2>}
			<form onSubmit={searchName}>
				<input
					type="text"
					placeholder="...Search your runescape name"
					value={userInput}
					onChange={handleChange}
				/>
				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Loading...' : 'Search'}
				</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{/* TODO Table of Player Skills */}
			{playerData && (
				<table>
					<thead>
						<tr>
							<th>Skill</th>
							<th>Rank</th>
							<th>Level</th>
							<th>Experience</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(playerData.skills).map(([skill, data]) => (
							<tr key={skill}>
								<td>{skill}</td>
								<td>{data.rank}</td>
								<td>{data.level}</td>
								<td>{data.experience}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
