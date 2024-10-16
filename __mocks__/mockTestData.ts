export const mockPlayerResponseBody = `111986,2910,506979661
244774,99,13115227
241085,99,13418382
244593,99,13258810
179845,99,26990101
192904,99,14645712
175831,99,13716257
198853,99,14976117
236627,99,13069816
211449,99,13247528
215446,99,13103930
176543,99,14104439
92724,99,18611536
154057,99,13948227
214705,99,13240556
221453,99,13144244
141040,105,24057687
163446,99,13818026
178085,99,13290086
143977,104,23520861
140503,102,18141951
157897,99,13214346
173078,99,13232341
145692,99,13950533
190211,99,13212433
146560,101,16991371
179857,99,13129855
143903,110,56630752
115481,106,28384779
94039,104,22813758
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
-1,-1
75389,12555
-1,-1
154634,2
-1,-1
-1,-1
-1,-1`

export const mockParsedPlayerData = {
	activities: {
		bounty_hunters: { rank: -1, count: -1 },
		bh_rogues: { rank: -1, count: -1 },
		dominion_tower: { rank: -1, count: -1 },
		the_crucible: { rank: -1, count: -1 },
		castle_wars_games: { rank: -1, count: -1 },
		ba_attackers: { rank: -1, count: -1 },
		ba_defenders: { rank: -1, count: -1 },
		ba_collectors: { rank: -1, count: -1 },
		ba_healers: { rank: -1, count: -1 },
		duel_tournament: { rank: -1, count: -1 },
		mobilising_armies: { rank: -1, count: -1 },
		conquest: { rank: -1, count: -1 },
		fist_of_guthix: { rank: -1, count: -1 },
		gg_resource_race: { rank: -1, count: -1 },
		gg_athletics: { rank: -1, count: -1 },
		we2_armadyl_lifetime_contribution: { rank: -1, count: -1 },
		we2_bandos_lifetime_contribution: { rank: -1, count: -1 },
		we2_armadyl_pvp_kills: { rank: -1, count: -1 },
		we2_bandos_pvp_kills: { rank: -1, count: -1 },
		heist_guard_level: { rank: -1, count: -1 },
		heist_robber_level: { rank: -1, count: -1 },
		cfp_5_game_average: { rank: -1, count: -1 },
		af15_cow_tipping: { rank: -1, count: -1 },
		af15_rats_killed_after_the_miniquest: { rank: -1, count: -1 },
		runescore: { rank: 75389, count: 12555 },
		clue_scrolls_easy: { rank: -1, count: -1 },
		clue_scrolls_medium: { rank: 154634, count: 2 },
		clue_scrolls_hard: { rank: -1, count: -1 },
		clue_scrolls_elite: { rank: -1, count: -1 },
		clue_scrolls_master: { rank: -1, count: -1 },
	},
	skills: {
		overall: { rank: 111986, level: 2910, experience: 506979661 },
		attack: { rank: 244774, level: 99, experience: 13115227 },
		defence: { rank: 241085, level: 99, experience: 13418382 },
		strength: { rank: 244593, level: 99, experience: 13258810 },
		constitution: { rank: 179845, level: 99, experience: 26990101 },
		ranged: { rank: 192904, level: 99, experience: 14645712 },
		prayer: { rank: 175831, level: 99, experience: 13716257 },
		magic: { rank: 198853, level: 99, experience: 14976117 },
		cooking: { rank: 236627, level: 99, experience: 13069816 },
		woodcutting: { rank: 211449, level: 99, experience: 13247528 },
		fletching: { rank: 215446, level: 99, experience: 13103930 },
		fishing: { rank: 176543, level: 99, experience: 14104439 },
		firemaking: { rank: 92724, level: 99, experience: 18611536 },
		crafting: { rank: 154057, level: 99, experience: 13948227 },
		smithing: { rank: 214705, level: 99, experience: 13240556 },
		mining: { rank: 221453, level: 99, experience: 13144244 },
		herblore: { rank: 141040, level: 105, experience: 24057687 },
		agility: { rank: 163446, level: 99, experience: 13818026 },
		thieving: { rank: 178085, level: 99, experience: 13290086 },
		slayer: { rank: 143977, level: 104, experience: 23520861 },
		farming: { rank: 140503, level: 102, experience: 18141951 },
		runecrafting: { rank: 157897, level: 99, experience: 13214346 },
		hunter: { rank: 173078, level: 99, experience: 13232341 },
		construction: { rank: 145692, level: 99, experience: 13950533 },
		summoning: { rank: 190211, level: 99, experience: 13212433 },
		dungeoneering: { rank: 146560, level: 101, experience: 16991371 },
		divination: { rank: 179857, level: 99, experience: 13129855 },
		invention: { rank: 143903, level: 110, experience: 56630752 },
		archaeology: { rank: 115481, level: 106, experience: 28384779 },
		necromancy: { rank: 94039, level: 104, experience: 22813758 },
	},
	timestamp: new Date(),
	username: 'testPlayer',
}

export const mockRunemetricsProfileData = {
	magic: 0,
	questsstarted: 0,
	totalskill: 0,
	questscomplete: 0,
	questsnotstarted: 0,
	totalxp: 0,
	ranged: 0,
	activities: [
		{ date: '04-Aug-2024 17:20', details: 'mock details', text: 'mock text' },
		{ date: '03-Aug-2024 18:04', details: 'mock details', text: 'mock text' },
		{ date: '03-Aug-2024 17:48', details: 'mock details', text: 'mock text' },
		{ date: '02-Aug-2024 17:48', details: 'mock details', text: 'mock text' },
		{ date: '01-Aug-2024 17:48', details: 'mock details', text: 'mock text' },
	],
	skillvalues: [
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 28,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 27,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 26,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 25,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 24,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 23,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 22,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 21,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 20,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 19,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 18,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 17,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 16,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 15,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 14,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 13,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 12,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 11,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 10,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 9,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 8,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 7,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 6,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 5,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 4,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 3,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 2,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 1,
			skillName: '',
		},
		{
			level: 0,
			xp: 0,
			rank: 0,
			id: 0,
			skillName: 'Attack',
		},
	],
	name: 'testPlayer',
	rank: '100,100',
	melee: 0,
	combatlevel: 0,
	loggedIn: 'false' as const,
	timestamp: new Date(),
}

// API result has around 340 quest objects
export const mockRunemetricsQuestsData = {
	quests: [
		{
			title: 'Mock Quest',
			status: 'COMPLETED',
			difficulty: 1,
			members: true,
			questPoints: 1,
			userEligible: true,
		},
		{
			title: 'Mock Quest 2',
			status: 'NOT_STARTED',
			difficulty: 1,
			members: false,
			questPoints: 1,
			userEligible: false,
		},
		{
			title: 'Mock Quest 3',
			status: 'STARTED',
			difficulty: 1,
			members: true,
			questPoints: 1,
			userEligible: true,
		},
	],
	loggedIn: 'false' as const,
}

export const mockRunemetricsMonthlyXpData = {
	monthlyXpGain: [
		{
			skillId: 0,
			totalXp: 0,
			averageXpGain: 0,
			totalGain: 0,
			monthData: [
				{
					xpGain: 0,
					timestamp: 1700147668614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1702739668614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1705418068614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1708096468614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1710602068614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1713276868614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1715868868614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1718547268614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1722278089630,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1722767363533,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1726496068614,
					rank: 0,
				},
				{
					xpGain: 0,
					timestamp: 1729088068614,
					rank: 0,
				},
			],
			timestamp: new Date(),
			name: 'testPlayer',
			skillName: 'Attack',
		},
	],
	loggedIn: 'false' as const,
}
