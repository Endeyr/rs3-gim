import type {
	PlayerActivities,
	PlayerJSON,
	PlayerSkills,
	ProfileSkills,
} from '@/types/api'

export const MAX_AGE = 60 * 60 * 1000 // 1 hour

export const runemetrics = {
	endpoints: {
		profile: `https://apps.runescape.com/runemetrics/profile/profile`,
		monthlyXp: `https://apps.runescape.com/runemetrics/xp-monthly`,
		quests: `https://apps.runescape.com/runemetrics/quests`,
	},
	modes: ['profile', 'monthlyXp', 'quests'] as const,
	questStatuses: ['NOT_STARTED', 'STARTED', 'COMPLETED'] as const,
	skills: {
		0: 'Attack',
		1: 'Defence',
		2: 'Strength',
		3: 'Constitution',
		4: 'Ranged',
		5: 'Prayer',
		6: 'Magic',
		7: 'Cooking',
		8: 'Woodcutting',
		9: 'Fletching',
		10: 'Fishing',
		11: 'Firemaking',
		12: 'Crafting',
		13: 'Smithing',
		14: 'Mining',
		15: 'Herblore',
		16: 'Agility',
		17: 'Thieving',
		18: 'Slayer',
		19: 'Farming',
		20: 'Runecrafting',
		21: 'Hunter',
		22: 'Construction',
		23: 'Summoning',
		24: 'Dungeoneering',
		25: 'Divination',
		26: 'Invention',
		27: 'Archaeology',
		28: 'Necromancy',
	},
}

export const hiscores = {
	endpoints: {
		normal: `http://services.runescape.com/m=hiscore/index_lite.ws`,
		ironman: `http://services.runescape.com/m=hiscore_ironman/index_lite.ws`,
		hardcore: `http://services.runescape.com/m=hiscore_hardcore_ironman/index_lite.ws`,
	},
	activities: [
		'bounty_hunters',
		'bh_rogues',
		'dominion_tower',
		'the_crucible',
		'castle_wars_games',
		'ba_attackers',
		'ba_defenders',
		'ba_collectors',
		'ba_healers',
		'duel_tournament',
		'mobilising_armies',
		'conquest',
		'fist_of_guthix',
		'gg_resource_race',
		'gg_athletics',
		'we2_armadyl_lifetime_contribution',
		'we2_bandos_lifetime_contribution',
		'we2_armadyl_pvp_kills',
		'we2_bandos_pvp_kills',
		'heist_guard_level',
		'heist_robber_level',
		'cfp_5_game_average',
		'af15_cow_tipping',
		'af15_rats_killed_after_the_miniquest',
		'runescore',
		'clue_scrolls_easy',
		'clue_scrolls_medium',
		'clue_scrolls_hard',
		'clue_scrolls_elite',
		'clue_scrolls_master',
	] as const,
	gamemodes: ['normal', 'ironman', 'hardcore'] as const,
	skills: [
		'overall',
		'attack',
		'defence',
		'strength',
		'constitution',
		'ranged',
		'prayer',
		'magic',
		'cooking',
		'woodcutting',
		'fletching',
		'fishing',
		'firemaking',
		'crafting',
		'smithing',
		'mining',
		'herblore',
		'agility',
		'thieving',
		'slayer',
		'farming',
		'runecrafting',
		'hunter',
		'construction',
		'summoning',
		'dungeoneering',
		'divination',
		'invention',
		'archaeology',
		'necromancy',
	] as const,
}

export const defaultSkillTree: PlayerSkills = {
	overall: { rank: 0, level: 1, experience: 0 },
	attack: { rank: 0, level: 1, experience: 0 },
	defence: { rank: 0, level: 1, experience: 0 },
	strength: { rank: 0, level: 1, experience: 0 },
	constitution: { rank: 0, level: 1, experience: 0 },
	ranged: { rank: 0, level: 1, experience: 0 },
	prayer: { rank: 0, level: 1, experience: 0 },
	magic: { rank: 0, level: 1, experience: 0 },
	cooking: { rank: 0, level: 1, experience: 0 },
	woodcutting: { rank: 0, level: 1, experience: 0 },
	fletching: { rank: 0, level: 1, experience: 0 },
	fishing: { rank: 0, level: 1, experience: 0 },
	firemaking: { rank: 0, level: 1, experience: 0 },
	crafting: { rank: 0, level: 1, experience: 0 },
	smithing: { rank: 0, level: 1, experience: 0 },
	mining: { rank: 0, level: 1, experience: 0 },
	herblore: { rank: 0, level: 1, experience: 0 },
	agility: { rank: 0, level: 1, experience: 0 },
	thieving: { rank: 0, level: 1, experience: 0 },
	slayer: { rank: 0, level: 1, experience: 0 },
	farming: { rank: 0, level: 1, experience: 0 },
	runecrafting: { rank: 0, level: 1, experience: 0 },
	hunter: { rank: 0, level: 1, experience: 0 },
	construction: { rank: 0, level: 1, experience: 0 },
	summoning: { rank: 0, level: 1, experience: 0 },
	dungeoneering: { rank: 0, level: 1, experience: 0 },
	divination: { rank: 0, level: 1, experience: 0 },
	invention: { rank: 0, level: 1, experience: 0 },
	archaeology: { rank: 0, level: 1, experience: 0 },
	necromancy: { rank: 0, level: 1, experience: 0 },
}

export const formatActivities = (activitiesArray?: string[]) => {
	// Ensure activitiesArray is defined and has the same length as hiscores.activities
	if (
		!activitiesArray ||
		activitiesArray.length !== hiscores.activities.length
	) {
		throw new Error(
			'Invalid activitiesArray: it must be defined and match the length of hiscores.activities.'
		)
	}

	const activities: PlayerActivities = hiscores.activities.reduce(
		(acc, activityName) => {
			acc[activityName] = { rank: 0, count: 0 }
			return acc
		},
		{} as PlayerActivities
	)

	hiscores.activities.forEach((activityName, index) => {
		const activityData = activitiesArray[index]

		// Check if activityData is defined before processing
		if (activityData) {
			const splitData = activityData.split(',')
			if (splitData.length !== 2) {
				throw new Error(`Unexpected format in activity data: ${activityData}`)
			}
			const [rankStr, countStr] = splitData

			// Parse the rank and count safely
			const rank = rankStr ? parseInt(rankStr, 10) : 0
			const count = countStr ? parseInt(countStr, 10) : 0

			// Update the activities object
			activities[activityName] = {
				rank,
				count,
			}
		} else {
			throw new Error(
				`Activity data is missing for index ${index} (${activityName})`
			)
		}
	})

	return activities
}

export const formatSkills = (skillsArray?: string[]) => {
	// Ensure skillsArray is defined and has the same length as hiscores.skills
	if (!skillsArray || skillsArray.length !== hiscores.skills.length) {
		throw new Error(
			'Invalid skillsArray: it must be defined and match the length of hiscores.skills.'
		)
	}

	const skills = { ...defaultSkillTree }

	hiscores.skills.forEach((skillName, index) => {
		const skillData = skillsArray[index]

		// Check if skillData is valid and split it
		if (skillData) {
			const splitData = skillData.split(',')
			if (splitData.length !== 3) {
				throw new Error(`Unexpected format in skill data: ${skillData}`)
			}
			const [rankStr, levelStr, experienceStr] = splitData

			// Parse the rank, level, and experience safely
			const rank = rankStr ? parseInt(rankStr, 10) : 0
			const level = levelStr ? parseInt(levelStr, 10) : 0
			const experience = experienceStr ? parseInt(experienceStr, 10) : 0

			// Ensure parsed values are valid numbers
			if (!isNaN(rank) && !isNaN(level) && !isNaN(experience)) {
				skills[skillName] = {
					rank,
					level,
					experience,
				}
			} else {
				console.warn(`Invalid skill data for ${skillName}: ${skillData}`)
			}
		} else {
			console.warn(`Skill data is missing for index ${index} (${skillName})`)
		}
	})

	return skills
}

export const formatRuneMetricsProfileSkills = (
	skillsArray: ProfileSkills[]
) => {
	const skills = { ...defaultSkillTree }

	hiscores.skills.forEach((skillName, index) => {
		const {
			rank,
			level,
			xp: experience,
		} = skillsArray.find((skill) => skill.id === index) || {
			rank: 0,
			level: 1,
			xp: 0,
		}

		skills[skillName] = {
			rank,
			level,
			experience,
		}
	})

	return skills
}

export const separateIntoLines = (jagexPlayer: string): string[] => {
	return jagexPlayer.trim().split('\n')
}

export const parseJagexPlayerToJSON = (jagexPlayer: string): PlayerJSON => {
	// Basic validation for input string
	if (!jagexPlayer || typeof jagexPlayer !== 'string') {
		throw new Error('Invalid input: jagexPlayer must be a non-empty string.')
	}
	// Split input into lines
	const lines = separateIntoLines(jagexPlayer)
	// Ensure the number of lines matches the expected count (skills + activities)
	const expectedLines = hiscores.skills.length + hiscores.activities.length
	if (lines.length !== expectedLines) {
		throw new Error(
			`Invalid input: Expected ${expectedLines} lines, got ${lines.length}.`
		)
	}
	// Slice lines to separate skills and activities sections
	const [skillsStartIndex, skillsEndIndex] = [0, hiscores.skills.length]
	const [activitiesStartIndex, activitiesEndIndex] = [
		hiscores.skills.length,
		hiscores.skills.length + hiscores.activities.length,
	]
	// Validate and format skills
	const activitiesArray = lines.slice(activitiesStartIndex, activitiesEndIndex)
	let activities, skills
	try {
		activities = formatActivities(activitiesArray)
	} catch (error) {
		throw new Error(`Invalid activity data: ${error}`)
	}

	const skillsArray = lines.slice(skillsStartIndex, skillsEndIndex)
	try {
		skills = formatSkills(skillsArray)
	} catch (error) {
		throw new Error(`Invalid skill data: ${error}`)
	}

	return {
		activities,
		skills,
	}
}
