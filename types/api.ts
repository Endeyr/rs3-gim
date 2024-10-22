import type { hiscores, runemetrics } from '@/lib/const';

export type Activities = (typeof hiscores.activities)[number];
export type Activity = {
  rank: number;
  count: number;
};
export type Chathead = string;
export type Player = string;

export type PlayerJSON = {
  activities: PlayerActivities;
  skills: PlayerSkills;
  timestamp?: Date;
  username?: string;
};

export type PlayerActivities<K extends string = Activities> = {
  [key in K]: Activity;
};

export type PlayerSkills<K extends string = Skills> = { [key in K]: Skill };
type Skills = (typeof hiscores.skills)[number];
type Skill = {
  level: number;
  rank: number;
  experience: number;
};

export type Gamemode = (typeof hiscores.gamemodes)[number];

export type MonthlyExperience = {
  monthlyXpGain: MonthlyExperienceGain[];
  loggedIn: string;
  name?: string;
};

export type MonthlyExperienceGain = {
  averageXpGain: number;
  monthData: number[];
  skillId: number;
  totalGain: number;
  totalXp: number;
  timestamp?: Date;
  skillName?: string;
};

export type Profile = {
  name: string;
  rank: string;
  totalskill: number;
  totalxp: number;
  combatlevel: number;
  magic: number;
  melee: number;
  ranged: number;
  questsstarted: number;
  questscomplete: number;
  questsnotstarted: number;
  activities: ProfileActivities[];
  skillvalues: ProfileSkills[];
  loggedIn: string;
  timestamp?: Date;
};

type ProfileActivities = {
  date: string;
  details: string;
  text: string;
};

export type ProfileSkills = {
  level: number;
  xp: number;
  rank: number;
  id: number;
  skillName?: string;
};

export type Quests = {
  quests: Quest[];
  loggedIn: string;
  timestamp?: Date;
  name?: string;
};

export type Quest = {
  title: string;
  status: RuneScapeQuestStatus;
  difficulty: number;
  members: boolean;
  questPoints: number;
  userEligible: boolean;
};

export type RuneScapeSkill = (typeof hiscores.skills)[number];

export type RuneScapeProfileActivities = {
  title: string;
  description: string;
  date: string;
};

export type RuneScapeProfileSkills<K extends string = RuneScapeSkill> = {
  [key in K]: {
    rank: number;
    level: number;
    experience: number;
  };
};

export type RuneScapeProfileQuests = {
  complete: number;
  started: number;
  not_started: number;
};

export type RuneScapeProfileOverall = {
  rank: number;
  level: number;
  experience: number;
};

export type RuneScapeProfileExperienceDistribution = {
  magic: number;
  melee: number;
  ranged: number;
};

export type RuneScapeQuestStatus = (typeof runemetrics.questStatuses)[number];
