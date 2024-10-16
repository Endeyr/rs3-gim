import { MonthlyExperienceGain, Profile, Quests } from '@/types/api'
import axios from 'axios'
import { runemetrics } from './../const'

export const getProfileData = async (name: string): Promise<Profile | null> => {
	try {
		const url = `${runemetrics.endpoints['profile']}?user=${encodeURIComponent(
			name
		)}&activities=5`
		const response = await axios.get(url, { timeout: 10000 })
		const data = response.data
		if (!data) {
			throw new Error('API response data is invalid or undefined')
		}
		data.timestamp = new Date()
		return data as Profile
	} catch (error: unknown) {
		handleError(error, 'getProfileData')
		return null
	}
}

// Fetch Quests Data
export const getQuestData = async (name: string): Promise<Quests | null> => {
	try {
		const url = `${runemetrics.endpoints['quests']}?user=${encodeURIComponent(
			name
		)}`
		const response = await axios.get(url, { timeout: 10000 })
		const data = response.data
		if (!data) {
			throw new Error('API response data is invalid or undefined')
		}
		data.timestamp = new Date()
		data.name = name
		return data as Quests
	} catch (error: unknown) {
		handleError(error, 'getQuestData')
		return null
	}
}

// Fetch Monthly XP Data
export const getMonthlyXpData = async (
	name: string,
	skillId: number
): Promise<MonthlyExperienceGain | null> => {
	try {
		const url = `${
			runemetrics.endpoints['monthlyXp']
		}?searchName=${encodeURIComponent(name)}&skillId=${skillId}`
		const response = await axios.get(url, { timeout: 10000 })
		const data = response.data
		if (!data) {
			throw new Error('API response data is invalid or undefined')
		}
		data.timestamp = new Date()
		data.name = name
		return data as MonthlyExperienceGain
	} catch (error: unknown) {
		handleError(error, 'getMonthlyXpData')
		return null
	}
}

// Common error handler to avoid repeating error handling code
const handleError = (error: unknown, functionName: string) => {
	if (axios.isAxiosError(error)) {
		throw new Error(`${functionName} error: ${error.message}`)
	} else if (error instanceof Error) {
		throw new Error(`${functionName} error: ${error.message}`)
	} else {
		throw new Error(`${functionName} error: an unknown error occurred`)
	}
}
