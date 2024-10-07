export interface ActivityI {
	rank: number
	count: number
}

export interface SkillI {
	rank: number
	level: number
	experience: number
}

export interface PlayerDataI {
	activities: Record<string, ActivityI>
	skills: Record<string, SkillI>
	timestamp: Date
}
