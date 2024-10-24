import { runemetrics } from '@/lib/const';

export interface ActivityI {
  date: string;
  details: string;
  text: string;
}

export interface SkillI {
  id: number;
  rank: number;
  level: number;
  xp: number;
  skillName: string;
}

export interface PlayerDataI {
  activities: ActivityI[];
  skillvalues: SkillI[];
  timestamp: Date;
  name: string;
  rank: string;
  melee: number;
  combatlevel: number;
  loggedIn: 'true' | 'false';
  totalxp: number;
  questsstarted: number;
  questscomplete: number;
  questsnotstarted: number;
  totalskill: number;
  quests: QuestI[];
}

export interface QuestI {
  title: string;
  status: RuneScapeQuestStatus;
  difficulty: number;
  members: boolean;
  questPoints: number;
  userEligible: boolean;
}

export type RuneScapeQuestStatus = (typeof runemetrics.questStatuses)[number];
