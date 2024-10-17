export interface MonthDataI {
	rank: number
	timestamp: Date
	xpGain: number
}

export interface MonthlyXpGainI {
	averageXpGain: number
	monthData: MonthDataI[]
	name: string
	skillId: number
	skillName: string
	timestamp: Date
	totalGain: number
	totalXp: number
}

export interface MonthlyXpI {
	monthlyXpGain: MonthlyXpGainI[]
	loggedIn: 'false' | 'true'
	name: string
}
