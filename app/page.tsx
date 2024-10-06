'use client'

import axios from 'axios'
import { useState } from 'react'

export default function Home() {
	const [userInput, setUserInput] = useState('')
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	// TODO State for player data

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
					console.log('Player data:', response.data)
					// TODO display user data
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
		</div>
	)
}
