import {
	MonthlyExperience,
	MonthlyExperienceGain,
	Profile,
	Quests,
} from '@/types/api'
import axios from 'axios'
import { ProfileSkills } from './../../types/api'
import { runemetrics } from './../const'

const skillsMap = new Map(Object.entries(runemetrics.skills))

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
		data.skillvalues.forEach((skill: ProfileSkills) => {
			const skillName = skillsMap.get(String(skill.id))
			if (!skillName) {
				console.warn(`Invalid skill ID: ${skill.id} - Name not found`)
				skill.skillName = 'unknown'
			} else {
				skill.skillName = skillName
			}
		})
		return data as Profile
	} catch (error: unknown) {
		handleError(error, 'getProfileData')
		return null
	}
}

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

export const getMonthlyXpData = async (
	name: string,
	skillId: number
): Promise<MonthlyExperience | null> => {
	try {
		const url = `${
			runemetrics.endpoints['monthlyXp']
		}?searchName=${encodeURIComponent(name)}&skillid=${skillId}`
		const response = await axios.get(url, { timeout: 10000 })
		const data = response.data
		if (!data) {
			throw new Error('API response data is invalid or undefined')
		}
		data.name = name
		data.monthlyXpGain.forEach((xpGain: MonthlyExperienceGain) => {
			const skillName = skillsMap.get(String(xpGain.skillId))
			xpGain.timestamp = new Date()
			xpGain.skillName = skillName || 'unknown'
		})
		return data as MonthlyExperience
	} catch (error: unknown) {
		handleError(error, 'getMonthlyXpData')
		return null
	}
}

const handleError = (error: unknown, functionName: string) => {
	console.error(`Error in ${functionName}:`, error)
	if (axios.isAxiosError(error)) {
		throw new Error(`${functionName} error: ${error.message}`)
	} else if (error instanceof Error) {
		throw new Error(`${functionName} error: ${error.message}`)
	} else {
		throw new Error(`${functionName} error: an unknown error occurred`)
	}
}
